
import styled from "styled-components";
import { Colors } from "../styles/colors";
import AnswerOption from "./AnswerOption";

function QuestionCard({
  category,
  question,
  options,
  selectedOption,
  onSelect,
  isMultiSelect,
}) {
  return (
    <Card>
      <TopRow>
        <CategoryPill>{category}</CategoryPill>
      </TopRow>

      <Question>{question}</Question>

      {isMultiSelect && <Notice>※ 복수 선택 가능해요</Notice>}

      <OptionList>
        {options.map((option) => (
          <AnswerOption
            key={option.id}
            text={option.text}
            selected={selectedOption.includes(option.id)}
            onClick={() => onSelect(option.id)}
            isMultiSelect={isMultiSelect}
          />
        ))}
      </OptionList>
    </Card>
  );
}

export default QuestionCard;


const Card = styled.div`
  width: min(936px, calc(100% - 40px));
  min-height: 588px;
  background: ${Colors.white};
  border-radius: 15px;
  padding: 48px;
  margin-top: 0;
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 28px 20px;
    min-height: auto;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CategoryPill = styled.div`
  color: ${Colors.white};
  text-align: center;
  font-family: ${Colors.font};
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px;
  box-sizing: border-box;
  gap: 10px;
  display: flex;
  width: 80px;
  height: 30px;
  padding: 8px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: ${Colors.secondPurple};
`;


const Question = styled.h2`

  font-size: 22px;
  margin: 22px 0 34px;
  color: ${Colors.black};
  text-align: center;

  @media (max-width: 480px) {
    font-size: 18px;
    margin: 18px 0 24px;
  }
`;

const Notice = styled.div`
  font-size: 13px;
  color: ${Colors.mainPurple};
  margin-bottom: 12px;
  width: 100%;
  text-align: center;
`;


const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
`;
