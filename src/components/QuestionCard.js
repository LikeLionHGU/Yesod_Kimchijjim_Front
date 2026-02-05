
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
          />
        ))}
      </OptionList>
    </Card>
  );
}

export default QuestionCard;

/* styled */

const Card = styled.div`
  width: 720px;
  background: ${Colors.white};
  border-radius: 16px;
  padding: 48px;
  margin-top: 32px;
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
`;

const CategoryPill = styled.div`
  color: ${Colors.white};
  text-align: center;
  font-family: ${Colors.font};
  font-size: 13px;
  font-weight: 700;
  line-height: 14px;

  display: flex;
  width: 80px;
  height: 30px;
  padding: 8px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  background: ${Colors.secondPurple};
`;

const Question = styled.h2`
  font-size: 22px;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
  color: ${Colors.black};
`;

const Notice = styled.div`
  font-size: 13px;
  color: ${Colors.fixGray};
  margin-bottom: 12px;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
