import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import Pencil from "../../assets/Pencil.svg";
import { api } from "../../utils/api";
import { QUESTION_DATA } from "../../constants/questions";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";

function LeaderResultPage() {
  const navigate = useNavigate();
  const { roomCode, userId } = useRoom();

  const categories = useMemo(() => {
    const base = QUESTION_DATA.map((q) => q.category);
    return Array.from(new Set([...base, "기타"]));
  }, []);

  // 화면용 규칙 형태: { questionId, category, text }
  const [rules, setRules] = useState([]);
  const [status, setStatus] = useState("MODIFYING"); 
  const [isEditing, setIsEditing] = useState(false);

  // 추가 입력
  const [newCategory, setNewCategory] = useState(categories[0] || "기타");
  const [newText, setNewText] = useState("");

  // 버튼 중복 방지
  const [isSaving, setIsSaving] = useState(false);

  const getCategoryByQuestionId = (qid) => {
    const found = QUESTION_DATA.find((q) => q.id === qid);
    return found?.category ?? "기타";
  };

  const mapServerDataToRules = (dataList) => {
    // 서버 예시: [{questionId:1, rule:"..."}, ...]
    return (dataList || []).map((it) => ({
      questionId: it.questionId,
      category: getCategoryByQuestionId(it.questionId),
      text: it.rule ?? "",
    }));
  };

  // summary 폴링 (방장이 수정하면 멤버도 실시간 반영되도록)
  useEffect(() => {
    if (!roomCode || !userId) return;

    let mounted = true;

    const fetchSummary = async () => {
      try {
        const res = await api.getRulesSummary({ roomCode, userId });
        if (!mounted) return;

        setStatus(res?.status || "MODIFYING");
        setRules(mapServerDataToRules(res?.data));
      } catch (e) {
        
      }
    };

    fetchSummary();
    const t = setInterval(fetchSummary, 2500);

    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [roomCode, userId]);

  // 규칙 수정(로컬)
  const updateRuleTextLocal = (questionId, text) => {
    setRules((prev) =>
      prev.map((r) => (r.questionId === questionId ? { ...r, text } : r))
    );
  };

  // 추가(서버 POST)
  const handleAddRule = async () => {
    if (!newText.trim()) return;
    if (!roomCode || !userId) return;

    setIsSaving(true);
    try {
      // 추가 규칙은 questionId=6 사용
      await api.addRuleToSummary({
        roomCode,
        userId,
        questionId: 6,
        category: newCategory,
        opinion: newText.trim(),
      });

      setNewText("");
      setNewCategory(categories[0] || "기타");
      // 성공 후엔 폴링이 알아서 갱신해줌
    } catch (e) {
      alert("규칙 추가에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  // 수정 저장(PUT) - 현재 화면의 모든 rule을 PUT으로 밀어버리
  const handleSaveEdits = async () => {
    if (!roomCode || !userId) return;

    // 빈 문장 방지
    if (rules.some((r) => !String(r.text || "").trim())) return;

    setIsSaving(true);
    try {
      // PUT은 questionId별로 opinion(rule text) 수정
      for (const r of rules) {
        await api.updateSummaryRule({
          roomCode,
          userId,
          questionId: r.questionId,
          opinion: String(r.text || "").trim(),
        });
      }

      setIsEditing(false);
    } catch (e) {
      alert("수정 저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  // 최종 완료(방장만) → 멤버는 status COMPLETE 보고 final로 이동
  const handleGoFinal = async () => {
    if (!roomCode || !userId) return;

    setIsSaving(true);
    try {
      await api.goFinalPage({ roomCode, userId });
      navigate("/test/final", { replace: true });
    } catch (e) {
      alert("최종 완료 요청에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  const disableFinal =
    rules.length === 0 || rules.some((r) => !String(r.text || "").trim());

  return (
    <Wrapper>
      <Header>
        <Title>규칙을 확인해요</Title>
        <SubTitle>방장만 수정/추가할 수 있어요</SubTitle>
      </Header>

      <MetaCard>
        <MetaActions>
          <EditToggleBtn
            type="button"
            onClick={() => setIsEditing((p) => !p)}
            disabled={isSaving}
          >
            <IconImg src={Pencil} alt="edit" />
            {isEditing ? "편집 종료" : "편집 시작"}
          </EditToggleBtn>

          {isEditing && (
            <SaveBtn type="button" onClick={handleSaveEdits} disabled={isSaving}>
              수정 저장
            </SaveBtn>
          )}
        </MetaActions>
      </MetaCard>

      <RuleList>
        {rules.map((r) => (
          <RuleItem key={r.questionId}>
            <Pill>{r.category || "기타"}</Pill>

            {!isEditing ? (
              <RuleText>{r.text}</RuleText>
            ) : (
              <RuleInput
                value={r.text}
                onChange={(e) => updateRuleTextLocal(r.questionId, e.target.value)}
              />
            )}
          </RuleItem>
        ))}
      </RuleList>

      {isEditing && (
        <EditPanel>
          <EditTitle>규칙 추가</EditTitle>

          <AddRow>
            <Select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            <AddInput
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="규칙을 직접 입력하세요"
            />

            <AddBtn
              type="button"
              onClick={handleAddRule}
              disabled={!newText.trim() || isSaving}
            >
              추가
            </AddBtn>
          </AddRow>
        </EditPanel>
      )}

      <ButtonWrap>
        <Button onClick={handleGoFinal} disabled={disableFinal || isSaving}>
          완료하고 최종으로
        </Button>

        <Hint>
          현재 상태: {status === "COMPLETE" ? "완료" : "수정 중"}
        </Hint>
      </ButtonWrap>
    </Wrapper>
  );
}

export default LeaderResultPage;



const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 0 80px;
`;

const Header = styled.div`
  width: 746px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: ${Colors.black};
  font-weight: 800;
`;

const SubTitle = styled.p`
  margin: 12px 0 24px;
  color: ${Colors.fixGray};
  font-size: 14px;
`;

const MetaCard = styled.div`
  width: 746px;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
  padding: 18px 20px;
  box-sizing: border-box;
  margin-bottom: 18px;
`;

const MetaActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const EditToggleBtn = styled.button`
  height: 40px;
  border: none;
  border-radius: 12px;
  padding: 0 14px;
  background: ${Colors.fixWhite};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const SaveBtn = styled.button`
  height: 40px;
  border: none;
  border-radius: 12px;
  padding: 0 14px;
  background: ${Colors.mainPurple};
  color: ${Colors.white};
  cursor: pointer;
  font-weight: 800;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const IconImg = styled.img`
  width: 18px;
  height: 18px;
  display: block;
`;

const RuleList = styled.div`
  width: 746px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RuleItem = styled.div`
  width: 746px;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
  padding: 16px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Pill = styled.div`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  color: ${Colors.white};
  background: ${Colors.secondPurple};
  white-space: nowrap;
`;

const RuleText = styled.div`
  flex: 1;
  font-size: 16px;
  color: ${Colors.black};
`;

const RuleInput = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid ${Colors.inputColor};
  border-radius: 10px;
  padding: 0 12px;
  outline: none;
`;

const EditPanel = styled.div`
  width: 746px;
  margin-top: 18px;
  padding: 18px 20px;
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
  box-sizing: border-box;
`;

const EditTitle = styled.div`
  font-weight: 800;
  color: ${Colors.black};
  margin-bottom: 10px;
`;

const AddRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Select = styled.select`
  height: 40px;
  border: 1px solid ${Colors.inputColor};
  border-radius: 10px;
  padding: 0 10px;
  outline: none;
  background: ${Colors.white};
`;

const AddInput = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid ${Colors.inputColor};
  border-radius: 10px;
  padding: 0 12px;
  outline: none;
`;

const AddBtn = styled.button`
  height: 40px;
  border: none;
  border-radius: 10px;
  padding: 0 14px;
  background: ${Colors.mainPurple};
  color: ${Colors.white};
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const ButtonWrap = styled.div`
  width: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-top: 20px;
`;

const Hint = styled.div`
  font-size: 12px;
  color: ${Colors.mainPurple};
`;
