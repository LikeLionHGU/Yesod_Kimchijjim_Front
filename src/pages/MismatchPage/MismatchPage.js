import { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";

function MismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  const { questionId, nextIndex, totalQuestions, myAnswer, others } = state || {};

  const handleGoAfter = () => {
    navigate("/after-mismatch", {
      state: { questionId, nextIndex, totalQuestions },
    });
  };

  return (
    <Wrapper>
      <Title>의견 차이가 있어요</Title>
      <SubTitle>서로 만족할 수 있는 중간 지점을 찾아봐요</SubTitle>

      <CompareCard>
        <CompareTitle>응답 비교 (더미)</CompareTitle>
        <Row>
          <Label>내 답</Label>
          <Value>{myAnswer}</Value>
        </Row>
        {others?.map((t, idx) => (
          <Row key={idx}>
            <Label>상대 {idx + 1}</Label>
            <Value>{t}</Value>
          </Row>
        ))}
      </CompareCard>

      <ButtonWrap>
        <Button onClick={handleGoAfter}>합의 규칙 작성하기</Button>
      </ButtonWrap>
    </Wrapper>
  );
}

export default MismatchPage;

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

const CompareCard = styled.div`
  width: 720px;
  background: ${Colors.white};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px ${Colors.boxShadowBlack};
`;

const CompareTitle = styled.div`
  font-weight: 800;
  margin-bottom: 16px;
  color: ${Colors.detailBlack};
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid ${Colors.detailWhite};
`;

const Label = styled.div`
  width: 80px;
  color: ${Colors.fixGray};
  font-weight: 700;
`;

const Value = styled.div`
  flex: 1;
  color: ${Colors.black};
`;

const ButtonWrap = styled.div`
  margin-top: 24px;
`;
