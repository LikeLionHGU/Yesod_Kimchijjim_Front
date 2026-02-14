
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import exclamation_mark from "../../assets/exclamation_mark.svg";
import { api } from "../../utils/api";
import { QUESTION_DATA } from "../../constants/questions";

function LeaderMismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.questionId) navigate("/room/test", { replace: true });
  }, [state, navigate]);

  const roomCode = sessionStorage.getItem("currentRoomCode") || "";
  const userIdStr = sessionStorage.getItem("userId") || "";
  const userId = userIdStr ? Number(userIdStr) : null;

  const questionId = state?.questionId;
  const nextIndex = state?.nextIndex ?? 0;
  const totalQuestions = state?.totalQuestions ?? QUESTION_DATA.length;
  const questionIndex = state?.questionIndex ?? nextIndex - 1;

  const questionMeta = useMemo(
    () => QUESTION_DATA.find((q) => q.id === questionId),
    [questionId]
  );

  const [answers] = useState(Array.isArray(state?.data) ? state.data : []);
  const [draftRule, setDraftRule] = useState("");

  const [hasSubmittedRule, setHasSubmittedRule] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDone = async () => {
    if (hasSubmittedRule) return;
    if (!draftRule.trim()) return;
    if (!roomCode || !questionId || !userId) return;

    setIsSubmitting(true);

    console.log("confirm 보내는 데이터", {
  questionId,
  draftRule,
  state
});


    // 서버로 보내는값 로그 찍
    console.log("[LeaderMismatch] confirmRule payload", {
      roomCode,
      userId,
      questionId,
      opinion: [draftRule],
      category: state?.category || questionMeta?.category || "",
    });

    try {
      await api.confirmRule({
        roomCode,
        userId,
        questionId,
        opinion: [draftRule],
        category: state?.category || questionMeta?.category || "",
      });

      setHasSubmittedRule(true);

      // 성공하면 AfterMismatch로 이동 (방장 화면 즉시 표시용 state 포함)
      navigate("/test/after-mismatch", {
        state: {
          questionId,
          nextIndex,
          totalQuestions,
          questionIndex,
          agreedRuleText: draftRule,
        },
        replace: true,
      });
    } catch (e) {
      console.error("LeaderMismatch confirmRule fail:", e?.message || e);
      alert("규칙 제출에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <TopIcon src={exclamation_mark} alt="!" />
      <Title>의견 차이가 있어요</Title>
      <SubTitle>서로 만족할 수 있는 중간 지점을 찾아봐요</SubTitle>

      <MainCard>
        <SmallLabel>논의 중인 질문</SmallLabel>

        <CardHeader>
          <QuestionTitle>{questionMeta?.question ?? "질문"}</QuestionTitle>
          <KeywordPill>
            {questionMeta?.category ?? state?.category ?? "키워드"}
          </KeywordPill>
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

      <InputCard>
        <RuleInput
          value={draftRule}
          onChange={(e) => setDraftRule(e.target.value)}
          placeholder="합의된 규칙 작성하기"
          disabled={hasSubmittedRule}
        />

        <DoneButton
          type="button"
          onClick={handleDone}
          disabled={!draftRule.trim() || isSubmitting || hasSubmittedRule}
        >
          {hasSubmittedRule ? "작성 완료!" : "작성 완료"}
        </DoneButton>
      </InputCard>
    </Wrapper>
  );
}

export default LeaderMismatchPage;



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

const GuideWrap = styled.div`
  width: 746px;
  margin-top: 24px;
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

const InputCard = styled.div`
  width: 746px;
  height: 132px;
  margin-top: 24px;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 0 15px rgba(163, 163, 253, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
`;

const RuleInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: ${Colors.black};
  background: transparent;
  padding-right: 16px;

  &::placeholder {
    color: ${Colors.fixGray};
  }
`;

const DoneButton = styled.button`
  display: flex;
  min-width: 175px;
  height: 55px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  background: ${Colors.mainPurple};
  color: ${Colors.white};
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;

  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
