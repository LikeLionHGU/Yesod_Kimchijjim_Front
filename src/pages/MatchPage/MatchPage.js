import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import check from "../../assets/check.svg";
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
  const questionIndex = state?.questionIndex ?? (nextIndex - 1); // 혹시 누락 대비

  const [isEditing, setIsEditing] = useState(false);
  const [ruleText, setRuleText] = useState(state?.ruleText ?? "");

  // rules[index] 자리에 최종 규칙 저장
  const saveRuleAt = (index, text) => {
    const prev = JSON.parse(localStorage.getItem("rules") || "[]");
    const next = Array.from({ length: totalQuestions }, (_, i) => prev[i] ?? "");
    next[index] = text;
    localStorage.setItem("rules", JSON.stringify(next));
  };

  const handleNext = () => {
    // 여기서 저장해야 "수정된 규칙"이 들어감
    saveRuleAt(questionIndex, ruleText);

    // 5문제 끝이면 ResultPage로
    if (nextIndex >= totalQuestions) {
      const saved = JSON.parse(localStorage.getItem("rules") || "[]");

      navigate("/result", {
        state: {
          roomTitle: "화목관 302호 방의 규칙",
          periodText: "2026.3.3 - 3.31",
          rules: saved.map((t, idx) => ({ id: idx + 1, text: t })),
        },
      });
      return;
    }

    // 다음 문제로
    navigate("/", { state: { startIndex: nextIndex } });
  };

  return (
    <Wrapper>
      <TopIcon src={check} alt="check" />

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

  position: relative;
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
  padding-right: 48px;
`;

const RuleInput = styled.input`
  flex: 1;
  height: 44px;
  border: 1px solid ${Colors.inputColor};
  border-radius: 10px;
  padding: 0 12px;
  font-size: 16px;
  outline: none;
  padding-right: 48px;
`;

const IconButton = styled.button`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);

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
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);

  border: none;
  background: transparent;
  color: ${Colors.mainPurple};
  font-weight: 800;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  width: 746px;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
