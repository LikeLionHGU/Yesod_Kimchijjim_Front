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

  // Match/AfterMismatch에서 "다음 문제 인덱스"를 넘기면 이어서 진행
  useEffect(() => {
    const startIndex = location.state?.startIndex;
    if (typeof startIndex === "number") {
      setCurrentIndex(startIndex);
      // state를 계속 들고 있으면 새로고침/재방문 때 꼬일 수 있어서 지움(권장)
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

    /* 
       백엔드 연동 (API 명세서 기반)
       7. 테스트(응답) 입력  POST /room/test
       request: { roomUserId, rule }
       
    await fetch("/room/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomUserId: 1, // TODO: 실제 roomUserId로 교체
        rule: ruleText,
      }),
    });
    */

    // 홀수 문제(1,3,5)=match / 짝수(2,4)=mismatch
    const isMatchDummy = currentQuestion.id % 2 === 1;

    if (isMatchDummy) {
      navigate("/match", {
        state: {
          questionId: currentQuestion.id,
          ruleText,
          nextIndex,
          totalQuestions,
        },
      });
    } else {
      navigate("/mismatch", {
        state: {
          questionId: currentQuestion.id,
          ruleText,
          nextIndex,
          totalQuestions,
         
          myAnswer: ruleText,
          others: [
            "상대1 더미 답변",
            "상대2 더미 답변",
            "상대3 더미 답변",
          ],
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

      <Button onClick={handleSubmit} disabled={selectedOption.length === 0}>
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
