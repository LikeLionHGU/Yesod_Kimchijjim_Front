
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
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
`;

const Bar = styled.div`
  width: 60px;
  height: 7px;
  border-radius: 2px;
  background-color: ${({ $active }) =>
    $active ? Colors.mainPurple : Colors.detailWhite};
  transition: background-color 0.3s;
`;
