
import styled from "styled-components";
import { Colors } from "../styles/colors";

function AnswerOption({ text, selected, onClick, isMultiSelect }) {
  return (
    <Option $selected={selected} onClick={onClick}>
      {isMultiSelect ? (
        <Square $selected={selected} />
      ) : (
        <Circle $selected={selected} />
      )}

      <Text $selected={selected}>{text}</Text>
    </Option>
  );
}

export default AnswerOption;




const Option = styled.div`
  display: flex;
  width: min(556px, 100%);
  height: 61px;
  padding: 17px 28px;
  align-items: center;
  gap: 12px;
  border-radius: 15px;
  cursor: pointer;
  box-sizing: border-box;
  background: ${Colors.fixWhite};
  border: 2px solid transparent;

  &:hover {
    border: 2px solid ${Colors.mainPurple};
    background: ${Colors.backgroundColor};
    box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
  }

  ${({ $selected }) =>
    $selected &&
    `
      border: 2px solid ${Colors.mainPurple};
      background: ${Colors.backgroundColor};
      box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
    `}

  @media (max-width: 480px) {
    height: auto;
    padding: 14px 16px;
    border-radius: 14px;
  }
`;

const Circle = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;

  border: 1px solid ${Colors.borderLine};
  background: ${Colors.fixWhite};

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: ${Colors.mainPurple};
    opacity: 0;
  }

  ${({ $selected }) =>
    $selected &&
    `
      border: 1px solid ${Colors.mainPurple};

      &::after {
        opacity: 1;
      }
    `}
`;


const Text = styled.div`
  font-family: ${Colors.font};
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  color: ${Colors.black};
  line-height: 17px;

  /*모바일에셔 깨짐 방지*/
  word-break: keep-all;

  ${({ $selected }) =>
    $selected &&
    `
      color: ${Colors.mainPurple};
    `}

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;



const Square = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative;
  border: 1px solid ${({ $selected }) =>
    $selected ? Colors.mainPurple : Colors.borderLine};
  background: ${Colors.fixWhite};

  /* 체크 표시 , selected일때만 보이게 */
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;

    width: 10px;
    height: 6px;

    border-left: 2px solid ${Colors.mainPurple};
    border-bottom: 2px solid ${Colors.mainPurple};

    transform: translate(-50%, -58%) rotate(-45deg);
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
  }
`;