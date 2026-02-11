import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import exclamation_mark from "../../assets/exclamation_mark.svg";
import { api } from "../../utils/api";
import { QUESTION_DATA } from "../../constants/questions";
import { useRoom } from "../../context/RoomContext";

function MemberMismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { roomCode } = useRoom();

  useEffect(() => {
    if (!state?.questionId) navigate("/test", { replace: true });
  }, [state, navigate]);

  const questionId = state?.questionId;
  const nextIndex = state?.nextIndex ?? 0;
  const totalQuestions = state?.totalQuestions ?? QUESTION_DATA.length;
  const questionIndex = state?.questionIndex ?? nextIndex - 1;

  const questionMeta = useMemo(
    () => QUESTION_DATA.find((q) => q.id === questionId),
    [questionId]
  );

  const [answers, setAnswers] = useState([]);

  // 답변 목록 가져오기
  useEffect(() => {
    if (!roomCode || !questionId) return;

    let mounted = true;

    (async () => {
      try {
        const data = await api.getResult({ roomId: roomCode, questionId });
        if (!mounted) return;

        setAnswers(data?.answers ?? []);
      } catch (e) {
        setAnswers([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [roomCode, questionId]);

  // agreedRuleText 생기면 AfterMismatch로 이동
  useEffect(() => {
    if (!roomCode || !questionId) return;

    const t = setInterval(async () => {
      try {
        const data = await api.getResult({ roomId: roomCode, questionId });

        if (data?.agreedRuleText) {
          navigate("/test/after-mismatch", {
            state: { questionId, nextIndex, totalQuestions, questionIndex },
            replace: true,
          });
        }
      } catch (e) {}
    }, 2000);

    return () => clearInterval(t);
  }, [roomCode, questionId, navigate, nextIndex, totalQuestions, questionIndex]);

  return (
    <Wrapper>
      <TopIcon src={exclamation_mark} alt="!" />
      <Title>의견 차이가 있어요</Title>
      <SubTitle>방장이 규칙을 정리하고 있어요</SubTitle>

      <MainCard>
        <SmallLabel>논의 중인 질문</SmallLabel>

        <CardHeader>
          <QuestionTitle>{questionMeta?.question ?? "질문"}</QuestionTitle>
          <KeywordPill>{questionMeta?.category ?? "키워드"}</KeywordPill>
        </CardHeader>

        <SectionLabel>나온 답변</SectionLabel>

        <AnswersWrap>
          {answers.map((t, idx) => (
            <AnswerBox key={idx}>{t}</AnswerBox>
          ))}
        </AnswersWrap>
      </MainCard>
    </Wrapper>
  );
}

export default MemberMismatchPage;

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
  font-weight: 800;
  color: ${Colors.black};
  text-align: center;
`;

const SubTitle = styled.p`
  margin: 12px 0 64px;
  font-size: 14px;
  color: ${Colors.fixGray};
  text-align: center;
`;

const MainCard = styled.div`
  width: 746px;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 0 15px rgba(163, 163, 253, 0.3);
  padding: 28px;
  box-sizing: border-box;
`;

const SmallLabel = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
  margin-bottom: 8px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
`;

const QuestionTitle = styled.div`
  color: ${Colors.black};
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
`;

const KeywordPill = styled.div`
  display: inline-flex;
  padding: 6px 16px;
  border-radius: 999px;
  background: ${Colors.secondPurple};
  color: ${Colors.white};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

const SectionLabel = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
  margin: 12px 0 10px;
`;

const AnswersWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 18px;
`;

const AnswerBox = styled.div`
  display: flex;
  height: 53px;
  padding: 11px 15px;
  align-items: center;
  border-radius: 12px;
  background: ${Colors.fixWhite};
  color: ${Colors.black};
  font-size: 14px;
  box-sizing: border-box;
`;
