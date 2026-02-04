import styled from "styled-components";

function AnswerOption({ text, selected, onClick }) {
  return (
    <Option selected={selected} onClick={onClick}>
      <Circle selected={selected} />
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

  background: ${({ selected }) =>
    selected ? "#f0efff" : "#f7f7f7"};
  border: ${({ selected }) =>
    selected ? "2px solid #6c63ff" : "2px solid transparent"};
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid
    ${({ selected }) => (selected ? "#6c63ff" : "#999")};
  background: ${({ selected }) =>
    selected ? "#6c63ff" : "transparent"};
`;
