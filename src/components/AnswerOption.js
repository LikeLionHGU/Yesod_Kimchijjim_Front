
import styled from "styled-components";
import { Colors } from "../styles/colors";

function AnswerOption({ text, selected, onClick }) {
  return (
    <Option $selected={selected} onClick={onClick}>
      <Circle $selected={selected} />
      {text}
    </Option>
  );
}

export default AnswerOption;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;

  background: ${({ $selected }) =>
    $selected ? Colors.fixWhite : Colors.detailWhite};
  border: ${({ $selected }) =>
    $selected
      ? `2px solid ${Colors.mainPurple}`
      : "2px solid transparent"};
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid
    ${({ $selected }) =>
      $selected ? Colors.mainPurple : Colors.borderLine};
  background: ${({ $selected }) =>
    $selected ? Colors.mainPurple : "transparent"};
`;
