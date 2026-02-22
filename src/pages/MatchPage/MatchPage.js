
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import check from "../../assets/check.svg";
import { QUESTION_DATA } from "../../constants/questions";
import { api } from "../../utils/api";
import ProgressBar from "../../components/common/ProgressBar";

function MatchPage() {
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

  const questionMeta = useMemo(
    () => QUESTION_DATA.find((q) => q.id === questionId),
    [questionId]
  );

  
  const rulesText = state?.data ?? [];

  const [hasPressed, setHasPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waitingMsg, setWaitingMsg] = useState("");

  const goNext = () => {
    if (nextIndex >= totalQuestions) navigate("/test/result");
    else navigate("/room/test", { state: { startIndex: nextIndex }, replace: true });
  };

  const pollUntilPass = () => {
    const t = setInterval(async () => {
      try {
        const res = await api.startNextMatch({ roomCode, userId });
        if (res === "PASS") {
          clearInterval(t);
          goNext();
        } else {
          setWaitingMsg("다른 사람도 확인 중이에요... 모두 누르면 넘어가요.");
        }
      } catch (e) {
        clearInterval(t);
        setWaitingMsg("서버 통신 오류가 있어요. 다시 눌러주세요.");
        setHasPressed(false);
      }
    }, 2000);

    return () => clearInterval(t);
  };

  const handleConfirm = async () => {
    if (hasPressed) return;
    if (!roomCode || !userId || !questionId) return;

    setHasPressed(true);
    setIsLoading(true);
    setWaitingMsg("");

    try {
      const res = await api.startNextMatch({ roomCode, userId });
      if (res === "PASS") {
        goNext();
        return;
      }
      // WAITING이면 폴링 시작
      setWaitingMsg("모두가 누를 때까지 기다려 주세요!");
      pollUntilPass();
    } catch (e) {
      setHasPressed(false);
      alert("요청에 실패했어요. 잠시 후 다시 눌러줘.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <ProgressBar total={totalQuestions} current={nextIndex} />
      <TopIcon src={check} alt="check" />
      <Title>모두의 답변이 일치해요</Title>
      <SubTitle>규칙은 모든 단계가 끝난 후 수정할 수 있어요</SubTitle>

      <RuleList>
        {rulesText.length === 0 ? (
          <EmptyText>규칙을 불러오는 중이에요...</EmptyText>
        ) : (
          rulesText.map((t, idx) => (
            <RuleCard key={idx}>
              <Tag>{questionMeta?.category || "키워드"}</Tag>
              <RuleText>{t}</RuleText>
            </RuleCard>
          ))
        )}
      </RuleList>

      <ButtonWrap>
        <Button onClick={handleConfirm} disabled={rulesText.length === 0 || isLoading || hasPressed}>
          {hasPressed ? "확인 완료!" : "확인했어요"}
        </Button>
        {hasPressed && <Hint>{waitingMsg || "확인했어요!"}</Hint>}
      </ButtonWrap>
    </Wrapper>
  );
}

export default MatchPage;


const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px 0 170px;
  box-sizing: border-box;
`;

const TopIcon = styled.img`
  width: 71px;
  height: 71px;
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
  margin: 10px 0 36px;
  color: ${Colors.fixGray};
  text-align: center;
  font-size: 14px;
`;

const RuleList = styled.div`
  width: min(746px, calc(100% - 40px));
  display: flex;
  flex-direction: column;
  gap: 14px;
`;


const RuleCard = styled.div`
  width: 100%;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
  display: flex;
  flex-direction: column;  
  align-items: flex-start;  
  gap: 10px;
  padding: 18px 22px;
  box-sizing: border-box;
`;



const Tag = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: ${Colors.white};
  background: ${Colors.secondPurple};
  display: inline-flex;
`;



const RuleText = styled.div`
  width: 100%;
  font-size: 16px;
  color: ${Colors.black};
  line-height: 1.4;
  word-break: keep-all;
`;



const ButtonWrap = styled.div`
  width: min(746px, calc(100% - 40px));
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  margin-top: 14px; 
`;

const Hint = styled.div`
  font-size: 12px;
  color: ${Colors.mainPurple};
  text-align: right;
`;

const EmptyText = styled.div`
  width: min(746px, calc(100% - 40px));
  text-align: center;
  color: ${Colors.fixGray};
  font-size: 14px;
  padding: 20px 0;
`;
