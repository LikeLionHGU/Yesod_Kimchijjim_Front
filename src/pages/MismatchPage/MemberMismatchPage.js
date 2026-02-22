
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import exclamation_mark from "../../assets/exclamation_mark.svg";
import { api } from "../../utils/api";
import { QUESTION_DATA } from "../../constants/questions";
import ProgressBar from "../../components/common/ProgressBar";

function MemberMismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.questionId) navigate("/room/test", { replace: true });
  }, [state, navigate]);

  const questionId = state?.questionId;
  const nextIndex = state?.nextIndex ?? 0;
  const totalQuestions = state?.totalQuestions ?? QUESTION_DATA.length;
  const questionIndex = state?.questionIndex ?? nextIndex - 1;

  const questionMeta = useMemo(
    () => QUESTION_DATA.find((q) => q.id === questionId),
    [questionId]
  );

  const answers = Array.isArray(state?.data) ? state.data : [];
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const roomCode = sessionStorage.getItem("currentRoomCode") || "";
    const userIdStr = sessionStorage.getItem("userId") || "";
    const userId = userIdStr ? Number(userIdStr) : null;

    if (!roomCode || !userId || !questionId) return;

    const t = setInterval(async () => {
      try {
        const res = await api.pollTestResult({ roomCode, userId });

        if (res?.status === "AFTER_MISMATCH" && !hasNavigatedRef.current) {
          hasNavigatedRef.current = true;
          const agreed = Array.isArray(res?.data) ? res.data[0] : "";

          navigate("/test/after-mismatch", {
            state: {
              questionId,
              nextIndex,
              totalQuestions,
              questionIndex,
              agreedRuleText: agreed,
            },
            replace: true,
          });
        }
      } catch (e) {}
    }, 1200);

    return () => clearInterval(t);
  }, [questionId, navigate, nextIndex, totalQuestions, questionIndex]);

  return (
    <Wrapper>
      <ProgressBar total={totalQuestions} current={questionIndex + 1} />
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

      <GuideWrap>
        <GuideTitle>💡대화 가이드</GuideTitle>
        <GuideList>
          <li>각자 가장 불편했던 순간을 공유해보세요</li>
          <li>서로의 입장을 고려해 중간 지점을 정해봐요</li>
          <li>실행 가능한 규칙 문장으로 정리해보세요</li>
        </GuideList>
      </GuideWrap>
    </Wrapper>
  );
}

export default MemberMismatchPage;

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 98px 0 120px;
  box-sizing: border-box;
  gap: 16px;
`;

const TopIcon = styled.img`
  width: 64px;
  height: 64px;
  margin: 0;

  @media (max-width: 520px) {
    width: 64px;
    height: 64px;
    margin: 0;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: ${Colors.black};
  text-align: center;

  @media (max-width: 520px) {
    font-size: 24px;
  }
`;

const SubTitle = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  color: ${Colors.fixGray};
  text-align: center;

  @media (max-width: 520px) {
    margin: 10px 0 36px;
  }
`;

const MainCard = styled.div`
  width: min(746px, calc(100% - 40px));
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 0 15px rgba(163, 163, 253, 0.3);
  padding: 28px;
  box-sizing: border-box;

  @media (max-width: 520px) {
    padding: 20px;
  }
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
  flex-wrap: wrap;
`;

const QuestionTitle = styled.div`
  color: ${Colors.black};
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;

  @media (max-width: 520px) {
    font-size: 18px;
    line-height: 26px;
  }
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

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const AnswerBox = styled.div`
  display: flex;
  align-items: center;

  min-height: 53px;
  height: auto;
  padding: 11px 15px;

  border-radius: 12px;
  background: ${Colors.fixWhite};

  color: ${Colors.black};
  font-size: 14px;
  line-height: 1.4;

  box-sizing: border-box;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const GuideWrap = styled.div`
  width: min(746px, calc(100% - 40px));
  margin-top: 16px;
`;

const GuideTitle = styled.div`
  font-weight: 800;
  color: ${Colors.black};
  margin-bottom: 10px;
`;

const GuideList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${Colors.fixGray};
  font-size: 14px;
  line-height: 22px;
`;