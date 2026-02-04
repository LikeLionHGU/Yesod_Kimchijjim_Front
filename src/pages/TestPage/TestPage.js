import { useState } from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

import { QUESTION_DATA } from "../../constants/questions";
import ProgressBar from "../../components/common/ProgressBar";
import Button from "../../components/common/Button";
import QuestionCard from "../../components/QuestionCard";

function TestPage() {
  // const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = () => {
    if (selectedOption.length === 0) return;

    setIsSubmitted(true);

    /* 백엔드 연동동
    await fetch("/room/test", {
      method: "POST",
      body: JSON.stringify({ answer: selectedOption }),
    });
   */


    // 마지막 질문이면 결과 페이지로 이동해야함
    if (currentIndex === totalQuestions - 1) {
      alert("모든 질문 완료 → ResultPage로 이동");
      return;
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption([]);
      setIsSubmitted(false);
    }, 800);
  };

  return (
    <Wrapper>
      <ProgressBar
        total={totalQuestions}
        current={currentIndex + 1}
      />

      <QuestionCard
        category={currentQuestion.category}
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        isMultiSelect={isMultiSelect}
      />

      <Button
        onClick={handleSubmit}
        disabled={selectedOption.length === 0}
      >
        선택 완료
      </Button>

      {isSubmitted && (
        <GuideText>
          다른 참여자들이 선택을 완료할 때까지 잠시만 기다려주세요!
        </GuideText>
      )}
    </Wrapper>
  );
}

export default TestPage;

/*styled-components*/

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GuideText = styled.div`
  margin-top: 12px;
  font-size: 13px;
  color: #6c63ff;
`;
