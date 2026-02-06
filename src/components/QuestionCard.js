
// import styled from "styled-components";
// import { Colors } from "../styles/colors";
// import AnswerOption from "./AnswerOption";

// function QuestionCard({
//   category,
//   question,
//   options,
//   selectedOption,
//   onSelect,
//   isMultiSelect,
// }) {
//   return (
//     <Card>
//       <TopRow>
//         <CategoryPill>{category}</CategoryPill>
//       </TopRow>

//       <Question>{question}</Question>

//       {isMultiSelect && <Notice>※ 복수 선택 가능해요</Notice>}

//       <OptionList>
//         {options.map((option) => (
//           <AnswerOption
//             key={option.id}
//             text={option.text}
//             selected={selectedOption.includes(option.id)}
//             onClick={() => onSelect(option.id)}
//           />
//         ))}
//       </OptionList>
//     </Card>
//   );
// }

// export default QuestionCard;

// /* styled */

// const Card = styled.div`
//   width: 936px;
//   height: 588px;
//   background: ${Colors.white};
//   border-radius: 15px;
//   padding: 48px;
//   margin-top: 32px;
//   box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
// `;

// const TopRow = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const CategoryPill = styled.div`
//   color: ${Colors.white};
//   text-align: center;
//   font-family: ${Colors.font};
//   font-size: 13px;
//   font-weight: 700;
//   line-height: 14px;

//   display: flex;
//   width: 80px;
//   height: 30px;
//   padding: 8px 14px;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   border-radius: 15px;
//   background: ${Colors.secondPurple};
// `;

// const Question = styled.h2`
//   font-size: 22px;
//   margin-bottom: 70px;
//   display: flex;
//   justify-content: center;
//   color: ${Colors.black};
// `;

// const Notice = styled.div`
//   font-size: 13px;
//   color: ${Colors.fixGray};
//   margin-bottom: 12px;
// `;

// const OptionList = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: 10px;
// display: flex;
// width: 556px;
// height: 61px;
// padding: 17px 28px;
// flex-direction: column;
// align-items: flex-start;
// gap: 10px;
// `;


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
  width: 936px;
  min-height: 588px;
  background: ${Colors.white};
  border-radius: 15px;
  padding: 48px;
  margin-top: 32px;
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};

  display: flex;
  flex-direction: column;
  align-items: center; /* 카드 내부 가운데 정렬 */
  box-sizing: border-box;
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
  font-weight: 700;
  line-height: 14px;

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
  margin: 24px 0 40px;
  color: ${Colors.black};
  text-align: center;
`;

const Notice = styled.div`
  font-size: 13px;
  color: ${Colors.fixGray};
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
