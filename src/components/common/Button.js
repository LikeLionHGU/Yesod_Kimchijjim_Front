
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
  color: ${Colors.white};

  background-color: ${Colors.mainPurple};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  transition: background-color 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    background-color: ${Colors.hoverPurple};
  }

  &:active:not(:disabled) {
    background-color: ${Colors.hoverPurple};
  }
`;