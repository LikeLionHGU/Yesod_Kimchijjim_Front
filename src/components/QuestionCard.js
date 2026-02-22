
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

      <Question $isMultiSelect={isMultiSelect}>{question}</Question>

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
  background: ${Colors.white};
  border-radius: 15px;
  padding: 40px 48px 32px;
  margin-top: 0;
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 28px 20px 24px;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CategoryPill = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 8px 14px;
  border-radius: 15px;

  background: ${Colors.secondPurple};
  color: ${Colors.white};

  font-size: 13px;
  font-weight: 700;
  line-height: 1;

 
  width: auto;             
  white-space: nowrap;     
`;

const Question = styled.h2`

  font-size: 22px;
  font-weight: 600;
  margin: 7px 0 ${(props) => (props.$isMultiSelect ? "18px" : "34px")};  color: ${Colors.black};
  text-align: center;

  @media (max-width: 480px) {
    font-size: 18px;
    margin: 7px 0 ${(props) => (props.$isMultiSelect ? "13px" : "24px")};  }
`;

const Notice = styled.div`
  font-size: 15px;
  font-weight: 400;
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
