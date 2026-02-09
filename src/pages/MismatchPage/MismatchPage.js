import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import exclamation_mark from "../../assets/exclamation_mark.svg";

function MismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  const {
    questionId,
    nextIndex,
    totalQuestions,
    myAnswer,
    others,
    questionIndex,
  } = state || {};

  const [draftRule, setDraftRule] = useState("");

  const answers = [myAnswer, ...(others ?? [])].filter(Boolean);

  const handleDone = () => {
    navigate("/after-mismatch", {
      state: { questionId, nextIndex, totalQuestions, draftRule, questionIndex },
    });
  };

  return (
    <Wrapper>
      <TopIcon src={exclamation_mark} alt="exclamaion_mark" />

      <Title>의견 차이가 있어요</Title>
      <SubTitle>서로 만족할 수 있는 중간 지점을 찾아봐요</SubTitle>

      <MainCard>
        <SmallLabel>논의 중인 질문</SmallLabel>

        <CardHeader>
          <QuestionTitle>몇시에 소등할까요?</QuestionTitle>
          <KeywordPill>키워드</KeywordPill>
        </CardHeader>

        <SectionLabel>나온 답변</SectionLabel>

        <AnswersWrap>
          {answers.map((t, idx) => (
            <AnswerBox key={idx}>{t}</AnswerBox>
          ))}
        </AnswersWrap>
      </MainCard>

      <GuideWrap>
        <GuideTitle>💡 대화 가이드</GuideTitle>
        <GuideList>
          <li>각자 가장 불편했던 순간을 공유해보세요</li>
          <li>서로의 입장을 고려해서 중간 지점을 정해봐요</li>
          <li>타협 가능한 “규칙 문장”을 찾아보세요</li>
        </GuideList>
      </GuideWrap>

      <InputCard>
        <RuleInput
          value={draftRule}
          onChange={(e) => setDraftRule(e.target.value)}
          placeholder="합의된 규칙 작성하기"
        />

        <DoneButton
          type="button"
          onClick={handleDone}
          disabled={!draftRule.trim()}
        >
          작성 완료
        </DoneButton>
      </InputCard>
    </Wrapper>
  );
}

export default MismatchPage;

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
  margin: 12px 0 64px;
  color: ${Colors.fixGray};
  text-align: center;
  font-size: 14px;
`;

const MainCard = styled.div`
  width: 746px;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 0 15px 0 rgba(163, 163, 253, 0.3);
  padding: 28px;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  display: flex;
  width: 80px;
  height: 25px;
  padding: 6px 23px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 999px;
  background: ${Colors.secondPurple};
  color: ${Colors.white};
  font-size: 12px;
  font-weight: 700;
  box-sizing: border-box;
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

/* 가이드 */
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
  box-shadow: 0 0 15px 0 rgba(163, 163, 253, 0.3);

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
  gap: 10px;

  border: none;
  border-radius: 12px;
  background: ${Colors.mainPurple};
  color: ${Colors.white};
  font-weight: 800;
  cursor: pointer;

  white-space: nowrap;
  line-height: 1;

  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const SmallLabel = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
  margin-bottom: 8px;
`;

const SectionLabel = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
  margin: 12px 0 10px;
`;
