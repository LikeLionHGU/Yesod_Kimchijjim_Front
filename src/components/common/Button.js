
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
  padding: 12px 32px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  background-color: ${({ disabled }) =>
    disabled ? Colors.borderLine : Colors.mainPurple};
  color: ${Colors.white};

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? Colors.borderLine : Colors.secondPurple};
  }
`;
