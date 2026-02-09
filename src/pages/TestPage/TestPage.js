import { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { QUESTION_DATA } from "../../constants/questions";
import ProgressBar from "../../components/common/ProgressBar";
import Button from "../../components/common/Button";
import QuestionCard from "../../components/QuestionCard";

function TestPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 테스트 시작이면 rules를 초기화
  useEffect(() => {
    const startIndex = location.state?.startIndex;
    if (typeof startIndex !== "number") {
      // 첫 진입인 경우
      localStorage.removeItem("rules");
    }
  }, []); // 주석 살림

  // Match/AfterMismatch에서 "다음 문제 인덱스"를 넘기면 이어서 진행
  useEffect(() => {
    const startIndex = location.state?.startIndex;
    if (typeof startIndex === "number") {
      setCurrentIndex(startIndex);
      // state를 계속 들고 있으면 새로고침/재방문 때 꼬일 수 있어서 지움
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  const currentQuestion = QUESTION_DATA[currentIndex];
  const totalQuestions = QUESTION_DATA.length;

  if (!currentQuestion) return null;

  const isMultiSelect = currentQuestion.id === 4;

  const handleSelect = (optionId) => {
    if (isMultiSelect) {
      setSelectedOption((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOption([optionId]);
    }
  };

  // 선택한 optionId -> optionText로 바꿔서 ruleText 만들기
  const buildRuleText = () => {
    const selectedTexts = currentQuestion.options
      .filter((opt) => selectedOption.includes(opt.id))
      .map((opt) => opt.text);

    return selectedTexts.join(" / ");
  };

  const handleSubmit = () => {
    if (selectedOption.length === 0) return;

    setIsSubmitted(true);

    const ruleText = buildRuleText();
    const nextIndex = currentIndex + 1;

    // 지금은 여기서 rules 저장 안함
    // match에서 수정할 수도 있고, mismatch에서 합의 규칙을 새로 쓰니까
    // 최종 확정은 다음 페이지에서 저장하는게 맞음

    const questionIndex = currentIndex; // 0~4 (몇 번째 문제인지)

    // 홀수 문제(1,3,5)=match / 짝수(2,4)=mismatch
    const isMatchDummy = currentQuestion.id % 2 === 1;

    if (isMatchDummy) {
      navigate("/match", {
        state: {
          questionId: currentQuestion.id,
          ruleText,
          nextIndex,
          totalQuestions,
          questionIndex,
        },
      });
    } else {
      navigate("/mismatch", {
        state: {
          questionId: currentQuestion.id,
          ruleText,
          nextIndex,
          totalQuestions,
          questionIndex,

          myAnswer: ruleText,
          others: ["상대1 답변", "상대2 답변", "상대3 답변"],
        },
      });
    }

    setSelectedOption([]);
    setIsSubmitted(false);
  };

  return (
    <Wrapper>
      <ProgressBar total={totalQuestions} current={currentIndex + 1} />

      <QuestionCard
        category={currentQuestion.category}
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        isMultiSelect={isMultiSelect}
      />

      <ButtonWrap>
        <Button onClick={handleSubmit} disabled={selectedOption.length === 0}>
          선택 완료
        </Button>
      </ButtonWrap>

      {isSubmitted && (
        <GuideText>
          다른 참여자들이 선택을 완료할 때까지 잠시만 기다려주세요!
        </GuideText>
      )}
    </Wrapper>
  );
}

export default TestPage;

/* styled-components */

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${Colors.backgroundColor};
`;

const GuideText = styled.div`
  margin-top: 12px;
  font-size: 13px;
  color: ${Colors.mainPurple};
`;

const ButtonWrap = styled.div`
  width: 746px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
