import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";

function AfterMismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  const { questionId, nextIndex, totalQuestions } = state || {};
  const [agreedRule, setAgreedRule] = useState("");

  const handleDone = () => {
    if (!agreedRule.trim()) return;

    /* 
              백엔드 연동 (API 명세서 기반)
      
    
    await fetch("/room/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rule: agreedRule }),
    });
    */

    if (nextIndex >= totalQuestions) {
      alert("5문제 끝! → ResultPage로 이동 (지금은 alert)");
      return;
    }

    navigate("/", { state: { startIndex: nextIndex } });
  };

  return (
    <Wrapper>
      <Title>규칙을 합의했어요</Title>
      <SubTitle>합의된 규칙을 입력해 주세요</SubTitle>

      <InputCard>
        <RuleInput
          value={agreedRule}
          onChange={(e) => setAgreedRule(e.target.value)}
          placeholder="합의된 규칙 작성하기"
        />
      </InputCard>

      <ButtonWrap>
        <Button onClick={handleDone} disabled={!agreedRule.trim()}>
          작성 완료
        </Button>
      </ButtonWrap>
    </Wrapper>
  );
}

export default AfterMismatchPage;

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: ${Colors.black};
`;

const SubTitle = styled.p`
  margin: 12px 0 40px;
  color: ${Colors.fixGray};
`;

const InputCard = styled.div`
  width: 720px;
  background: ${Colors.white};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px ${Colors.boxShadowBlack};
`;

const RuleInput = styled.input`
  width: 100%;
  height: 54px;
  border: 1px solid ${Colors.inputColor};
  border-radius: 12px;
  padding: 0 14px;
  font-size: 16px;
  outline: none;
`;

const ButtonWrap = styled.div`
  margin-top: 24px;
`;
