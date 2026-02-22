
import styled from "styled-components";
import { Colors } from "../../styles/colors";

function Button({ children, onClick, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}

export default Button;


const StyledButton = styled.button`
  width: 166px;
  height: 52px;

  border-radius: 12px;
  border: none;

  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  background-color: ${({ disabled }) =>
    disabled ? Colors.borderLine : Colors.mainPurple};
  color: ${Colors.white};

  transition: background-color 0.15s ease, transform 0.05s ease;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? Colors.borderLine : Colors.secondPurple};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.98)")};
  }
`;
