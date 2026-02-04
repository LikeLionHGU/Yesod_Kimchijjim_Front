
import styled from "styled-components";
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
      <Category>{category}</Category>
      <Question>{question}</Question>

      {isMultiSelect && (
        <Notice>※ 복수 선택 가능해요</Notice>
      )}

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

/* styled-components*/

const Card = styled.div`
  width: 720px;
  background: #ffffff;
  border-radius: 16px;
  padding: 48px;
  margin-top: 32px;
`;

const Category = styled.div`
  font-size: 14px;
  margin-bottom: 12px;
`;

const Question = styled.h2`
  font-size: 22px;
  margin-bottom: 24px;
`;

const Notice = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
