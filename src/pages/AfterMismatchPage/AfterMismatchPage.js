import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import check from "../../assets/check.svg";
import { api } from "../../utils/api";
import { useRoom } from "../../context/RoomContext";

function AfterMismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { roomCode, userId } = useRoom();

  useEffect(() => {
    if (!state?.questionId) navigate("/test", { replace: true });
  }, [state, navigate]);

  const questionId = state?.questionId;
  const nextIndex = state?.nextIndex ?? 0;
  const totalQuestions = state?.totalQuestions ?? 5;

  const [ruleText, setRuleText] = useState("");
  const [readyInfo, setReadyInfo] = useState(null);

  // ready 버튼 한 번만
  const [hasPressedReady, setHasPressedReady] = useState(false);
  const [isSendingReady, setIsSendingReady] = useState(false);

  // 합의된 규칙 불러오기
  useEffect(() => {
    if (!roomCode || !questionId) return;

    let mounted = true;

    (async () => {
      try {
        const data = await api.getResult({ roomId: roomCode, questionId });
        if (!mounted) return;

        // 합의 완료 페이지에서 보여줄 규칙 문장
        setRuleText(data?.agreedRuleText || "");
      } catch (e) {
        setRuleText("");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [roomCode, questionId]);

  // all-ready 폴링
  useEffect(() => {
    if (!roomCode || !questionId) return;

    const t = setInterval(async () => {
      try {
        const res = await api.getReadyStatus({
          roomId: roomCode,
          screen: "AFTER_MISMATCH",
          questionId,
        });

        setReadyInfo(res);

        if (res?.isAllReady) {
          if (nextIndex >= totalQuestions) navigate("/test/result");
          else navigate("/test", { state: { startIndex: nextIndex } });
        }
      } catch (e) {}
    }, 2000);

    return () => clearInterval(t);
  }, [roomCode, questionId, navigate, nextIndex, totalQuestions]);

  // 내가 ready 누르기
  const handleReady = async () => {
    if (hasPressedReady) return;
    if (!roomCode || !questionId || !userId) return;
    if (!ruleText.trim()) return;

    setIsSendingReady(true);
    try {
      const res = await api.ready({
        roomId: roomCode,
        roomUserId: userId,
        screen: "AFTER_MISMATCH",
        questionId,
      });

      setHasPressedReady(true);
      setReadyInfo(res);
    } catch (e) {
      alert("요청에 실패했어요. 잠시 후 다시 눌러줘.");
    } finally {
      setIsSendingReady(false);
    }
  };

  const notReadyCount =
    readyInfo && !readyInfo.isAllReady
      ? readyInfo.totalCount - readyInfo.readyCount
      : 0;

  return (
    <Wrapper>
      <TopIcon src={check} alt="check" />

      <Title>규칙을 합의했어요</Title>
      <SubTitle>규칙은 테스트가 끝난 뒤에도 수정할 수 있어요</SubTitle>

      <RuleCard>
        <Tag>키워드</Tag>
        <RuleText>{ruleText || "합의된 규칙을 불러오는 중이에요..."}</RuleText>
      </RuleCard>

      <ButtonWrap>
        <Button
          onClick={handleReady}
          disabled={!ruleText.trim() || isSendingReady || hasPressedReady}
        >
          {hasPressedReady ? "확인 완료!" : "확인했어요"}
        </Button>

        {hasPressedReady && (
          <Hint>
            {notReadyCount > 0
              ? `아직 ${notReadyCount}명이 누르지 않았어요. 모두 누르면 넘어가요.`
              : "모두 눌렀어요! 곧 넘어가요."}
          </Hint>
        )}
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
  padding-top: 120px;
  padding-bottom: 80px;
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
  margin: 12px 0 68px;
  color: ${Colors.fixGray};
  text-align: center;
  font-size: 14px;
`;

const RuleCard = styled.div`
  width: 746px;
  height: 101px;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  box-sizing: border-box;
`;

const Tag = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: ${Colors.white};
  background: ${Colors.secondPurple};
  white-space: nowrap;
`;

const RuleText = styled.div`
  flex: 1;
  font-size: 16px;
  color: ${Colors.black};
`;

const ButtonWrap = styled.div`
  width: 746px;
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
