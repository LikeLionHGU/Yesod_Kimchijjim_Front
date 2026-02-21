
import styled from "styled-components";
import { Colors } from "../../styles/colors";


const ProgressBar = ({ total, current }) => {
  return (
    <ProgressContainer>
      {Array.from({ length: total }).map((_, idx) => (
        <Bar key={idx} $active={idx < current} />
      ))}
    </ProgressContainer>
  );
};

export default ProgressBar;



// const ProgressContainer = styled.div`
//   width: min(936px, calc(100% - 40px));
//   display: flex;
//   justify-content: center;
//   gap: 18px;
//   margin-bottom: 28px;
//   box-sizing: border-box;
// `;

// const Bar = styled.div`
//   width: 120px;
//   height: 6px;
//   border-radius: 999px;
//   background-color: ${({ $active }) =>
//     $active ? Colors.mainPurple : Colors.detailWhite};
//   transition: background-color 0.2s;

//   /* 모바일에서 자동으로 줄어들게 */
//   flex: 1;
//   max-width: 120px;
//   min-width: 40px;
// `;


const ProgressContainer = styled.div`
  width: min(936px, calc(100% - 40px)); 
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 28px;
  box-sizing: border-box;
`;

const Bar = styled.div`
  height: 6px;
  border-radius: 999px;
  background-color: ${({ $active }) =>
    $active ? Colors.mainPurple : Colors.detailWhite};
  transition: background-color 0.2s;
  flex: 1;            
  max-width: 120px;   
  min-width: 40px;    
`;