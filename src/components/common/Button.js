import styled from "styled-components";

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
    disabled ? "#c7c3f3" : "#6c63ff"};
  color: #ffffff;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "#c7c3f3" : "#5a52e0"};
  }
`;
