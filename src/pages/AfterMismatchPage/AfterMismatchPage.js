
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import Ellipse5 from "../../assets/Ellipse 5.svg";

function AfterMismatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // state 없으면 잘못 진입 → 홈
  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  const totalQuestions = state?.totalQuestions ?? 5;
  const nextIndex = state?.nextIndex ?? 0;

  // Mismatch에서 넘어온 합의 규칙(draftRule)
  const [ruleText] = useState(state?.draftRule ?? "");

  const handleNext = () => {
    if (nextIndex >= totalQuestions) {
      alert("5문제 끝! → ResultPage로 이동하깅");
      return;
    }
    navigate("/", { state: { startIndex: nextIndex } });
  };

  return (
    <Wrapper>
      <TopIcon src={Ellipse5} alt="ellipse" />

     
      <Title>규칙을 합의했어요</Title>
      <SubTitle>새로운 규칙을 만들었어요</SubTitle>

      
      <RuleCard>
        <Tag>키워드</Tag>
        <RuleText>{ruleText || "합의한 규칙이 여기에 표시돼요."}</RuleText>
      </RuleCard>

      <ButtonWrap>
        <Button onClick={handleNext} disabled={!ruleText.trim()}>
          다음으로
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
  padding-top: 120px;
  padding-bottom: 80px;
`;

const TopIcon = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 31px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: ${Colors.black};
  text-align: center;
  font-weight: 800;
`;

const SubTitle = styled.p`
  margin: 12px 0 68px;
  color: ${Colors.fixGray};
  text-align: center;
  font-size: 14px;
`;

const RuleCard = styled.div`
  width: 746px;
  height: 101px;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};

  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  box-sizing: border-box;
`;

const Tag = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: ${Colors.white};
  background: ${Colors.secondPurple};
`;

const RuleText = styled.div`
  flex: 1;
  font-size: 16px;
  color: ${Colors.black};
`;

const ButtonWrap = styled.div`
  margin-top: 20px;
`;
