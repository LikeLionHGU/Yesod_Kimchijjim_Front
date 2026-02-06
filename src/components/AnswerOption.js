
// import styled from "styled-components";
// import { Colors } from "../styles/colors";

// function AnswerOption({ text, selected, onClick }) {
//   return (
//     <Option $selected={selected} onClick={onClick}>
//       <Circle $selected={selected} />
//       {text}
//     </Option>
//   );
// }

// export default AnswerOption;

// const Option = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 16px;
//   border-radius: 12px;
//   cursor: pointer;

//   background: ${({ $selected }) =>
//     $selected ? Colors.fixWhite : Colors.detailWhite};
//   border: ${({ $selected }) =>
//     $selected
//       ? `2px solid ${Colors.mainPurple}`
//       : "2px solid transparent"};
// `;

// const Circle = styled.div`
//   width: 18px;
//   height: 18px;
//   border-radius: 50%;
//   border: 2px solid
//     ${({ $selected }) =>
//       $selected ? Colors.mainPurple : Colors.borderLine};
//   background: ${({ $selected }) =>
//     $selected ? Colors.mainPurple : "transparent"};
// `;


import styled from "styled-components";
import { Colors } from "../styles/colors";

function AnswerOption({ text, selected, onClick }) {
  return (
    <Option $selected={selected} onClick={onClick}>
      <Circle $selected={selected} />
      <Text $selected={selected}>{text}</Text>
    </Option>
  );
}

export default AnswerOption;


const Option = styled.div`
  display: flex;
  width: 556px;
  height: 61px;
  padding: 17px 28px;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  cursor: pointer;

  /*디폴트*/
  background: ${Colors.fixWhite};
  border: 2px solid transparent;

  /*hover 시*/
  &:hover {
    border: 2px solid ${Colors.mainPurple};
    opacity: 0.7;
    background: ${Colors.backgroundColor}; /* var(--BG, #F6F5FC) */
    box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
  }

  /*selected 상태*/
  ${({ $selected }) =>
    $selected &&
    `
      border: 2px solid ${Colors.mainPurple};
      background: ${Colors.backgroundColor};
      box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
      opacity: 1;
    `}
`;

// const Circle = styled.div`
//   width: 18px;
//   height: 18px;
//   border-radius: 50%;

//   /*디폴트*/
//   border: 2px solid ${Colors.borderLine};
//   background: transparent;

//   /*selected 상태*/
//   ${({ $selected }) =>
//     $selected &&
//     `
//       border: 2px solid ${Colors.mainPurple};
//       background: ${Colors.mainPurple};
//     `}
// `;

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
  color: ${Colors.black};

  ${({ $selected }) =>
    $selected &&
    `
      color: ${Colors.secondPurple};
      font-weight: 600;
    `}
`;
