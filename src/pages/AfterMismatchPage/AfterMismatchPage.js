
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import check from "../../assets/check.svg";
import { QUESTION_DATA } from "../../constants/questions";
import { api } from "../../utils/api";
import ProgressBar from "../../components/common/ProgressBar";

function AfterMismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();


  const roomCode = sessionStorage.getItem("currentRoomCode") || "";
  const userIdStr = sessionStorage.getItem("userId") || "";
  const userId = userIdStr ? Number(userIdStr) : null;

  useEffect(() => {
    if (!state?.questionId) navigate("/room/test", { replace: true });
  }, [state, navigate]);

  const questionId = state?.questionId;
  const nextIndex = state?.nextIndex ?? 0;
  const totalQuestions = state?.totalQuestions ?? QUESTION_DATA.length;

  const questionIndex = state?.questionIndex ?? nextIndex - 1;
  const progressCurrent = Math.min(totalQuestions, questionIndex + 1);

  const questionMeta = useMemo(
    () => QUESTION_DATA.find((q) => q.id === questionId),
    [questionId]
  );

  const [ruleText, setRuleText] = useState(state?.agreedRuleText || "");
  const [hasPressed, setHasPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waitingMsg, setWaitingMsg] = useState("");

  const pollRef = useRef(null);

  const goNext = () => {
    if (nextIndex >= totalQuestions) navigate("/test/result");
    else
      navigate("/room/test", {
        state: { startIndex: nextIndex },
        replace: true,
      });
  };

  // summary에서 questionId 규칙 찾아오기
  useEffect(() => {
    if (!roomCode || !userId || !questionId) return;

    let mounted = true;

    const pickRuleText = (found) => {
      if (!found) return "";
      return (
        found.rule ||
        found.ruleText ||
        found.agreedRuleText ||
        found.text ||
        found.content ||
        ""
      );
    };

    const fetchOnce = async () => {
      try {
        const summary = await api.getRuleSummary({ roomCode, userId });

        
        const rules = Array.isArray(summary) ? summary : summary?.data ?? [];
        const found = rules.find(
          (r) => Number(r.questionId) === Number(questionId)
        );

        const txt = pickRuleText(found);

        if (mounted && txt) setRuleText(txt);
      } catch (e) {
        // 폴링은 계속
      }
    };

    fetchOnce();
    const t = setInterval(fetchOnce, 1500);

    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [roomCode, userId, questionId]);

  const startPollingPass = () => {
    
    if (pollRef.current) return;

    pollRef.current = setInterval(async () => {
      try {
        const res = await api.startNextMismatch({ roomCode, userId });
        if (res === "PASS") {
          clearInterval(pollRef.current);
          pollRef.current = null;
          goNext();
        } else {
          setWaitingMsg("모두가 누를 때까지 기다려주세요!");
        }
      } catch (e) {
        clearInterval(pollRef.current);
        pollRef.current = null;
        setWaitingMsg("서버 통신 오류가 있어요. 다시 눌러주세요.");
        setHasPressed(false);
      }
    }, 2000);
  };


  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = null;
    };
  }, []);

  const handleConfirm = async () => {
    if (hasPressed) return;
    if (!roomCode || !userId || !questionId) return;

    setHasPressed(true);
    setIsLoading(true);
    setWaitingMsg("");

    try {
      const res = await api.startNextMismatch({ roomCode, userId });

      if (res === "PASS") {
        goNext();
        return;
      }

      setWaitingMsg("모두가 누를 때까지 기다려주세요!");
      startPollingPass();
    } catch (e) {
      setHasPressed(false);
      alert("요청에 실패했어요. 잠시 후 다시 눌러줘.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <HeaderToProgressSpacer /> 
      <ProgressBar total={totalQuestions} current={progressCurrent} />
      <ProgressToIconSpacer /> 
      <TopIcon src={check} alt="check" />
      <Title>규칙을 합의했어요</Title>
      <SubTitle>규칙은 테스트가 끝난 뒤에도 수정할 수 있어요</SubTitle>

      <RuleCard>
        <Tag>{questionMeta?.category ?? "키워드"}</Tag>
        <RuleText>{ruleText || "합의된 규칙을 불러오는 중이에요..."}</RuleText>
      </RuleCard>

      <ButtonWrap>
        <ConfirmButton
          onClick={handleConfirm}
          disabled={!ruleText || isLoading || hasPressed}
          $pressed={hasPressed}
        >
          {hasPressed ? "확인 완료!" : "확인했어요"}
        </ConfirmButton>
        {hasPressed && <Hint>{waitingMsg || "모두가 누를 때까지 기다려주세요!"}</Hint>}
      </ButtonWrap>
    </Wrapper>
  );
}

export default AfterMismatchPage;


const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 80px;
  box-sizing: border-box;
`;

const HeaderToProgressSpacer = styled.div`
  height: 49px; /* A */
`;

const ProgressToIconSpacer = styled.div`
  height: 49px; /* B */
`;

const TopIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 31px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: ${Colors.black};
  text-align: center;
  font-weight: 800;
`;

const SubTitle = styled.p`
  margin: 12px 0 44px;
  color: ${Colors.fixGray};
  text-align: center;
  font-size: 14px;
`;


const RuleCard = styled.div`
  width: 746px;
  max-width: calc(100% - 40px);
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 24px;
  box-sizing: border-box;
`;

const Tag = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
  color: ${Colors.white};
  background: ${Colors.secondPurple};
  white-space: nowrap;
`;

const RuleText = styled.div`
  width: 100%;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  color: ${Colors.black};
`;


const ButtonWrap = styled.div`
  width: 746px;
  max-width: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

const Hint = styled.div`
  font-size: 12px;
  color: ${Colors.mainPurple};
  text-align: right;
`;


const ConfirmButton = styled(Button)`
  width: 175px;
  height: 55px;
  padding: 12px 62px;
  border-radius: 11px;

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 0;
  }
`;