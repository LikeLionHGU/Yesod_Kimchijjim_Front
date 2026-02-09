import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import Pencil from "../../assets/Pencil.svg";
import TitleSection from "../../components/common/TitleSection";
import Pencil_purple from "../../assets/Pencil_purple.svg";


const DUMMY_RULES = [
  { id: 1, text: "밤 11시에 소등하기" },
  { id: 2, text: "밤 11시에 소등하기" },
  { id: 3, text: "밤 11시에 소등하기" },
  { id: 4, text: "밤 11시에 소등하기" },
  { id: 5, text: "밤 11시에 소등하기" },
];

function ResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [rules, setRules] = useState(state?.rules ?? DUMMY_RULES);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newRuleText, setNewRuleText] = useState("");


  const startEdit = (rule) => {
    setEditingId(rule.id);
    setDraft(rule.text);
  };

  const finishEdit = () => {
    if (!draft.trim()) return;

    setRules((prev) =>
      prev.map((r) =>
        r.id === editingId ? { ...r, text: draft } : r
      )
    );
    setEditingId(null);
    setDraft("");
  };

  const handleSave = () => {
  // ResultPage에서 규칙추가/수정 모두 완료후 다음으로 누르면
  // FinalResultPage로 이동해야함
  navigate("/final-result", {
    state: {
      roomTitle: "로뎀관 302호 방의 규칙",
      periodText: "2026.3.3 - 3.31",
      rules, // 지금 화면에서 수정추가된 rules 그대로 넘김
    },
  });
};


  return (
    <Wrapper>
      <TitleSection
        iconSrc={Pencil_purple}
        titleText="규칙을 수정할 수 있어요"
        subTitleText="답변을 토대로 우리방의 규칙을 만들었어요"
      />

      <Board>
        <BoardHeader>
          <BoardTitle>로뎀관 302호 방의 규칙</BoardTitle>
          <BoardPeriod>2026.3.3 - 3.31</BoardPeriod>
        </BoardHeader>

        <RuleList>
          {rules.map((rule) => {
            const isEditing = editingId === rule.id;

            return (
              <RuleItem key={rule.id} $editing={isEditing}>
                <Keyword>키워드</Keyword>

                {!isEditing ? (
                  <RuleText>{rule.text}</RuleText>
                ) : (
                  <RuleInput
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                )}

                {!isEditing ? (
                  <IconBtn onClick={() => startEdit(rule)}>
                    <img src={Pencil} alt="edit" />
                  </IconBtn>
                ) : (
                  <DoneBtn onClick={finishEdit}>수정 완료</DoneBtn>
                )}
              </RuleItem>
            );
          })}

          {!isAdding ? (
  <AddRule type="button" onClick={() => setIsAdding(true)}>
    규칙 추가하기
  </AddRule>
) : (
  <AddRow>
    <Keyword>키워드</Keyword>
    <RuleInput
      value={newRuleText}
      onChange={(e) => setNewRuleText(e.target.value)}
      placeholder="규칙을 입력하세요"
    />
    <DoneBtn
      type="button"
      onClick={() => {
        if (!newRuleText.trim()) return;
        setRules((prev) => [...prev, { id: Date.now(), text: newRuleText }]);
        setNewRuleText("");
        setIsAdding(false);
      }}
    >
      추가 완료
    </DoneBtn>
  </AddRow>
)}

        </RuleList>
      </Board>

      <BottomBtnWrap>
        <SaveBtn onClick={handleSave}>다음으로</SaveBtn>
      </BottomBtnWrap>
    </Wrapper>
  );
}

export default ResultPage;


const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const Board = styled.div`
  width: 936px;
  background: ${Colors.white};
  border-radius: 15px;
  padding: 28px;
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
`;

const BoardHeader = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const BoardTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${Colors.detailBlack};
`;

const BoardPeriod = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
`;

const RuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RuleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 14px;
  background: ${Colors.white};
  box-shadow: ${({ $editing }) =>
    $editing
      ? "0 0 15px rgba(163,163,253,0.3)"
      : "0 0 12px rgba(0,0,0,0.06)"};
  position: relative;
`;

const Keyword = styled.div`
  padding: 6px 14px;
  border-radius: 999px;
  background: ${Colors.secondPurple};
  color: ${Colors.white};
  font-size: 11px;
  font-weight: 700;
`;

const RuleText = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
`;

const RuleInput = styled.input`
  flex: 1;
  height: 40px;
  border-radius: 10px;
  border: 1px solid ${Colors.detailWhite};
  padding: 0 12px;
`;

const IconBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  img {
    width: 22px;
  }
`;

const DoneBtn = styled.button`
  border: none;
  background: transparent;
  color: ${Colors.mainPurple};
  font-weight: 700;
  cursor: pointer;
`;

const AddRule = styled.button`
  margin-top: 10px;
  border: none;
  background: transparent;
  color: ${Colors.mainPurple};
  font-weight: 700;
  cursor: pointer;
  align-self: center;
`;

const BottomBtnWrap = styled.div`
  width: 936px;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const SaveBtn = styled.button`
  width: 175px;
  height: 55px;
  border-radius: 12px;
  background: ${Colors.mainPurple};
  color: ${Colors.white};
  font-weight: 700;
  border: none;
  cursor: pointer;
`;


const AddRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 14px;
  background: ${Colors.white};
  box-shadow: 0 0 15px rgba(163, 163, 253, 0.3);
`;
