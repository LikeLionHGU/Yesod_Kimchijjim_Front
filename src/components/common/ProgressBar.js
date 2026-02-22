
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


const ProgressContainer = styled.div`
  width: min(936px, calc(100% - 40px)); 
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 71px;
  box-sizing: border-box;
`;

const Bar = styled.div`
  height: 7px;
  border-radius: 999px;
  background-color: ${({ $active }) =>
    $active ? Colors.secondPurplePurple : Colors.White};
  transition: background-color 0.2s;
  flex: 1;            
  max-width: 175px;   
  min-width: 40px;    
`;