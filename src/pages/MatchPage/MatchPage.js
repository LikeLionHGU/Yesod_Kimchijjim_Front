import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import check from "../../assets/check.svg";
import { api } from "../../utils/api";
import { QUESTION_DATA } from "../../constants/questions";
import { useRoom } from "../../context/RoomContext";

function MatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { roomCode, userId } = useRoom();

  // state 없으면 잘못 진입(직접 url 등) → test로
  useEffect(() => {
    if (!state?.questionId) navigate("/test", { replace: true });
  }, [state, navigate]);

  const questionId = state?.questionId;
  const nextIndex = state?.nextIndex ?? 0;
  const totalQuestions = state?.totalQuestions ?? QUESTION_DATA.length;

  const questionMeta = useMemo(
    () => QUESTION_DATA.find((q) => q.id === questionId),
    [questionId]
  );

  const [rulesText, setRulesText] = useState([]);
  const [readyInfo, setReadyInfo] = useState(null);

  // 버튼 연타 방지 + "한 번만 누르기"
  const [hasPressedReady, setHasPressedReady] = useState(false);
  const [isSendingReady, setIsSendingReady] = useState(false);

  // 만장일치 규칙 로드
  useEffect(() => {
    if (!roomCode || !questionId) return;

    let mounted = true;
    (async () => {
      try {
        const data = await api.getResult({ roomId: roomCode, questionId });
        if (!mounted) return;

        // 만장일치일 때 내려오는 규칙 문장들
        setRulesText(data?.unanimousRuleTexts || []);
      } catch (e) {
        setRulesText([]);
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
          screen: "MATCH",
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
    // 이미 눌렀으면 아무 것도 안 함
    if (hasPressedReady) return;
    if (!roomCode || !questionId || !userId) return;

    setIsSendingReady(true);
    try {
      const res = await api.ready({
        roomId: roomCode,
        roomUserId: userId,
        screen: "MATCH",
        questionId,
      });

      // 눌렀다는 상태 잠금
      setHasPressedReady(true);

      // count 바로 갱신
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

      <Title>모두의 답변이 일치해요</Title>
      <SubTitle>
        {questionMeta?.question ? questionMeta.question : "규칙을 확인해요"}
      </SubTitle>

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
        <Button
          onClick={handleReady}
          disabled={
            rulesText.length === 0 || isSendingReady || hasPressedReady
          }
        >
          {hasPressedReady ? "확인 완료!" : "확인했어요"}
        </Button>

        {/* ready 눌렀을 때만 안내문 보여주기 */}
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

export default MatchPage;

/* ===== CSS ===== */

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
  margin: 12px 0 44px;
  color: ${Colors.fixGray};
  text-align: center;
  font-size: 14px;
`;

const RuleList = styled.div`
  width: 746px;
  display: flex;
  flex-direction: column;
  gap: 14px;
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

const EmptyText = styled.div`
  width: 746px;
  text-align: center;
  color: ${Colors.fixGray};
  font-size: 14px;
  padding: 20px 0;
`;
