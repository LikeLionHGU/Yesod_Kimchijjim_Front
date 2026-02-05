import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import Ellipse5 from "../../assets/Ellipse 5.svg";
import Pencil from "../../assets/Pencil.svg";

function MatchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // state 없으면 잘못 진입 → 홈
  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  const questionId = state?.questionId;
  const totalQuestions = state?.totalQuestions ?? 5;
  const nextIndex = state?.nextIndex ?? 0;

  const [isEditing, setIsEditing] = useState(false);
  const [ruleText, setRuleText] = useState(state?.ruleText ?? "");

  const handleNext = () => {
    /* 
         백엔드 연동 (API 명세서 기반)
      
    await fetch("/room/test", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rule: state.ruleText,
        update: ruleText,
      }),
    });
    */

    // 5문제 끝이면 ResultPage로 가야하지만 지금은 alert
    if (nextIndex >= totalQuestions) {
      alert("5문제 끝! → ResultPage로 이동하깅");
      return;
    }

    // 다음 문제로
    navigate("/", { state: { startIndex: nextIndex } });
  };

  return (
    <Wrapper>

      <TopIcon src={Ellipse5} alt="ellipse" />

      <Title>모두의 답변이 일치해요</Title>
      <SubTitle>답변을 토대로 우리방의 규칙을 만들었어요</SubTitle>

      <RuleCard>
        <Tag>키워드</Tag>

        {!isEditing ? (
          <RuleText>{ruleText}</RuleText>
        ) : (
          <RuleInput
            value={ruleText}
            onChange={(e) => setRuleText(e.target.value)}
            placeholder="규칙을 수정해보세요"
          />
        )}

        {!isEditing ? (
          <IconButton
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label="규칙 수정"
            title="수정"
          >
            <IconImg src={Pencil} alt="pencil" />
          </IconButton>
        ) : (
          <EditDoneBtn type="button" onClick={() => setIsEditing(false)}>
            수정 완료
          </EditDoneBtn>
        )}
      </RuleCard>

      <ButtonWrap>
        <Button onClick={handleNext} disabled={!ruleText.trim()}>
          다음으로
        </Button>
      </ButtonWrap>
    </Wrapper>
  );
}

export default MatchPage;

/*styled*/

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
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
`;

const SubTitle = styled.p`
  margin: 12px 0 40px;
  color: ${Colors.fixGray};
  margin-bottom: 64px;
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

const RuleInput = styled.input`
  flex: 1;
  height: 44px;
  border: 1px solid ${Colors.inputColor};
  border-radius: 10px;
  padding: 0 12px;
  font-size: 16px;
  outline: none;
`;


const IconButton = styled.button`
  border: none;
  background: transparent;
  padding: 6px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: ${Colors.fixWhite};
  }
`;


const IconImg = styled.img`
  width: 24px;
  height: 24px;
  display: block;
`;


const EditDoneBtn = styled.button`
  border: none;
  background: transparent;
  color: ${Colors.mainPurple};
  font-weight: 800;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  margin-top: 20px;
`;
