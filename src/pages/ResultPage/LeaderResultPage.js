// /* eslint-disable */
// import { useEffect, useMemo, useRef, useState } from "react";
// import styled from "styled-components";
// import { Colors } from "../../styles/colors";
// import Button from "../../components/common/Button";
// import Pencil from "../../assets/Pencil_purple.svg";
// import { api } from "../../utils/api";
// import { QUESTION_DATA } from "../../constants/questions";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useRoom } from "../../context/RoomContext";

// function LeaderResultPage() {
//   const navigate = useNavigate();
//   const location = useLocation(); //추가됨
//   const room = useRoom();

//   const isFromBoardEdit = location.state?.isFromBoardEdit; //추가됨

//   const roomCode =
//     room?.roomCode || sessionStorage.getItem("currentRoomCode") || "";
//   const userIdStr = room?.userId || sessionStorage.getItem("userId") || "";
//   const userId = userIdStr ? Number(userIdStr) : null;

//   const categories = useMemo(() => {
//     const base = QUESTION_DATA.map((q) => q.category);
//     return Array.from(new Set([...base, "기타"]));
//   }, []);

//   // 화면용 규칙: { id(ruleId), questionId, category, text }
//   const [rules, setRules] = useState([]);
//   const [status, setStatus] = useState("MODIFYING");
//   const [isEditing, setIsEditing] = useState(false);

//   // 추가입력
//   const [newCategory, setNewCategory] = useState(categories[0] || "기타");
//   const [newText, setNewText] = useState("");

//   const [isSaving, setIsSaving] = useState(false);

//   // 편집 중엔 폴링이 rules를 덮어쓰지 않도록
//   const isEditingRef = useRef(false);
//   useEffect(() => {
//     isEditingRef.current = isEditing;
//   }, [isEditing]);

//   const getCategoryByQuestionId = (qid) => {
//     const found = QUESTION_DATA.find((q) => q.id === Number(qid));
//     return found?.category ?? "기타";
//   };

//   // 카테고리 -> questionId (기타는 6)
//   const getQuestionIdByCategory = (category) => {
//     if (category === "기타") return 6;
//     const found = QUESTION_DATA.find((q) => q.category === category);
//     return found?.id ?? 6;
//   };

//   const mapServerDataToRules = (res) => {
//     const list = Array.isArray(res) ? res : (res?.data || res?.rules || []);
//     return list.map((it) => ({
//       id: it.id,
//       questionId: it.questionId,
//       category: getCategoryByQuestionId(it.questionId),
//       text: it.rule ?? "",
//     }));
//   };

//   // summary 폴링
//   useEffect(() => {
//     if (!roomCode || !userId) return;

//     let mounted = true;

//     const fetchSummary = async () => {
//       try {
//         const res = await api.getRuleSummary({ roomCode, userId });
//         if (!mounted) return;

//         setStatus(res?.status || "MODIFYING");

//         if (!isEditingRef.current) {
//           setRules(mapServerDataToRules(res));
//         }

//         if (res?.status === "COMPLETE" && !isFromBoardEdit) {
//           navigate("/test/final", { replace: true }); //complete이후 &&c추가 
//         }
//       } catch (e) {
//         console.error("[LeaderResult] getRuleSummary failed:", e?.message || e);
//       }
//     };

//     fetchSummary();
//     const t = setInterval(fetchSummary, 2500);

//     return () => {
//       mounted = false;
//       clearInterval(t);
//     };
//   }, [roomCode, userId, navigate]);

//   // 로컬 수정
//   const updateRuleTextLocal = (ruleId, text) => {
//     setRules((prev) => prev.map((r) => (r.id === ruleId ? { ...r, text } : r)));
//   };

//   // 규칙 추가
//   const handleAddRule = async () => {
//     if (!newText.trim()) return;
//     if (!roomCode || !userId) return;

//     setIsSaving(true);
//     try {
//       const qid = getQuestionIdByCategory(newCategory);

//       await api.addRuleToSummary({
//         roomCode,
//         userId,
//         questionId: qid,
//         category: newCategory,
//         opinion: newText.trim(),
//       });

//       setNewText("");
//       setNewCategory(categories[0] || "기타");

//       const res = await api.getRuleSummary({ roomCode, userId });
//       setRules(mapServerDataToRules(res));
//     } catch (e) {
//       alert("규칙 추가에 실패했어요. 잠시 후 다시 시도해 주세요.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // 수정 저장(ruleId 기반 PUT)
//   const handleSaveEdits = async () => {
//     if (!roomCode || !userId) return;
//     if (rules.some((r) => !String(r.text || "").trim())) return;

//     setIsSaving(true);
//     try {
//       for (const r of rules) {
//         await api.updateSummaryRuleById({
//           roomCode,
//           userId,
//           ruleId: r.id,
//           opinion: String(r.text || "").trim(),
//         });
//       }

//       setIsEditing(false);

//       const res = await api.getRuleSummary({ roomCode, userId });
//       setRules(mapServerDataToRules(res));
//     } catch (e) {
//       alert("수정 저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // 최종 완료
//   const handleGoFinal = async () => {
//     if (!roomCode || !userId) return;

//     if(location.state?.isFromBoardEdit) {
//       navigate("/board");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       await api.goFinalPage({ roomCode, userId });
//       // COMPLETE는 폴링에서 감지해서 이동
//     } catch (e) {
//       alert("최종 완료 요청 실패");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const disableFinal =
//     rules.length === 0 || rules.some((r) => !String(r.text || "").trim());

//   return (
//     <Wrapper>
//       <Header>
//         <IconWrap>
//           <img src={Pencil} alt="pencil" />
//         </IconWrap>

//         <Title>규칙을 확인해요</Title>
//         <SubTitle>방장만 수정/추가할 수 있어요</SubTitle>
//       </Header>

//       <Card>
//         <CardTopRow>
//           <CardTitle>
//             {room?.roomName ? `${room.roomName} 규칙` : "우리방 규칙"}
//           </CardTitle>

//           <ActionRow>
//             <GhostBtn
//               type="button"
//               onClick={() => setIsEditing((p) => !p)}
//               disabled={isSaving}
//             >
//               {isEditing ? "편집 종료" : "편집 시작"}
//             </GhostBtn>

//             {isEditing && (
//               <PrimarySmallBtn
//                 type="button"
//                 onClick={handleSaveEdits}
//                 disabled={isSaving}
//               >
//                 수정 저장
//               </PrimarySmallBtn>
//             )}
//           </ActionRow>
//         </CardTopRow>

//         <RuleList>
//           {rules.map((r) => (
//             <RuleItem key={r.id}>
//               <Pill>{r.category || "기타"}</Pill>

//               {!isEditing ? (
//                 <RuleText>{r.text}</RuleText>
//               ) : (
//                 <RuleInput
//                   value={r.text}
//                   onChange={(e) => updateRuleTextLocal(r.id, e.target.value)}
//                 />
//               )}
//             </RuleItem>
//           ))}
//         </RuleList>

//         {isEditing && (
//           <AddSection>
//             <AddTitle>규칙 추가</AddTitle>

//             <AddRow>
//               <Select
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//               >
//                 {categories.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </Select>

//               <AddInput
//                 value={newText}
//                 onChange={(e) => setNewText(e.target.value)}
//                 placeholder="규칙을 직접 입력하세요"
//               />

//               <AddBtn
//                 type="button"
//                 onClick={handleAddRule}
//                 disabled={!newText.trim() || isSaving}
//               >
//                 추가
//               </AddBtn>
//             </AddRow>
//           </AddSection>
//         )}
//       </Card>

//       <BottomArea>
//         <Button onClick={handleGoFinal} disabled={disableFinal || isSaving}>
//           {location.state?.isFromBoardEdit ? "수정완료" : "다음으로"}
//         </Button>

//       </BottomArea>
//     </Wrapper>
//   );
// }

// export default LeaderResultPage;



// const Wrapper = styled.div`
//   min-height: 100vh;
//   background: ${Colors.backgroundColor};
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 90px 0 80px;
// `;

// const Header = styled.div`
//   width: 746px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;

//   @media (max-width: 780px) {
//     width: calc(100% - 32px);
//   }
// `;

// const IconWrap = styled.div`
//   width: 56px;
//   height: 56px;
//   display: grid;
//   place-items: center;
//   margin-bottom: 10px;

//   img {
//     width: 52px;
//     height: 52px;
//     display: block;
//   }
// `;

// const Title = styled.h1`
//   margin: 0;
//   font-size: 28px;
//   color: ${Colors.black};
//   font-weight: 800;
// `;

// const SubTitle = styled.p`
//   margin: 12px 0 24px;
//   color: ${Colors.fixGray};
//   font-size: 14px;
// `;

// const Card = styled.div`
//   width: 746px;
//   border-radius: 18px;
//   background: ${Colors.white};
//   box-shadow: 0 10px 28px ${Colors.boxShadowPurple};
//   padding: 20px;
//   box-sizing: border-box;

//   @media (max-width: 780px) {
//     width: calc(100% - 32px);
//   }
// `;

// const CardTopRow = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 12px;
//   margin-bottom: 16px;
// `;

// const CardTitle = styled.div`
//   font-size: 13px;
//   font-weight: 800;
//   color: ${Colors.black};
// `;

// const ActionRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const GhostBtn = styled.button`
//   height: 36px;
//   border: none;
//   border-radius: 12px;
//   padding: 0 14px;
//   background: ${Colors.fixWhite};
//   cursor: pointer;
//   font-weight: 800;
//   opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
//   pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
// `;

// const PrimarySmallBtn = styled.button`
//   height: 36px;
//   border: none;
//   border-radius: 12px;
//   padding: 0 14px;
//   background: ${Colors.mainPurple};
//   color: ${Colors.white};
//   cursor: pointer;
//   font-weight: 800;
//   opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
//   pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
// `;

// const RuleList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 14px;
// `;

// const RuleItem = styled.div`
//   width: 100%;
//   border-radius: 15px;
//   background: ${Colors.fixWhite};
//   box-shadow: 0 8px 22px ${Colors.boxShadowPurple};
//   padding: 16px 16px;
//   box-sizing: border-box;
//   display: flex;
//   align-items: center;
//   gap: 14px;
// `;

// const Pill = styled.div`
//   padding: 6px 12px;
//   border-radius: 999px;
//   font-size: 12px;
//   color: ${Colors.white};
//   background: ${Colors.secondPurple};
//   white-space: nowrap;
// `;

// const RuleText = styled.div`
//   flex: 1;
//   font-size: 16px;
//   color: ${Colors.black};
//   line-height: 1.35;
// `;

// const RuleInput = styled.input`
//   flex: 1;
//   height: 44px;
//   border: 1px solid ${Colors.inputColor};
//   border-radius: 12px;
//   padding: 0 14px;
//   outline: none;
//   background: ${Colors.white};
//   font-size: 15px;
// `;

// const AddSection = styled.div`
//   margin-top: 18px;
//   padding-top: 16px;
//   border-top: 1px solid ${Colors.inputColor};
// `;

// const AddTitle = styled.div`
//   font-weight: 800;
//   color: ${Colors.black};
//   margin-bottom: 10px;
// `;

// const AddRow = styled.div`
//   display: flex;
//   gap: 10px;
//   align-items: center;

//   @media (max-width: 640px) {
//     flex-direction: column;
//     align-items: stretch;
//   }
// `;

// const Select = styled.select`
//   height: 44px;
//   border: 1px solid ${Colors.inputColor};
//   border-radius: 12px;
//   padding: 0 12px;
//   outline: none;
//   background: ${Colors.white};
//   min-width: 120px;
// `;

// const AddInput = styled.input`
//   flex: 1;
//   height: 44px;
//   border: 1px solid ${Colors.inputColor};
//   border-radius: 12px;
//   padding: 0 14px;
//   outline: none;
//   background: ${Colors.white};
// `;

// const AddBtn = styled.button`
//   height: 44px;
//   border: none;
//   border-radius: 12px;
//   padding: 0 16px;
//   background: ${Colors.mainPurple};
//   color: ${Colors.white};
//   cursor: pointer;
//   font-weight: 800;
//   opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
//   pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
// `;

// const BottomArea = styled.div`
//   width: 746px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   gap: 8px;
//   margin-top: 22px;

//   @media (max-width: 780px) {
//     width: calc(100% - 32px);
//   }
// `;


import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import PencilTop from "../../assets/Pencil_purple.svg";
import EditPencil from "../../assets/edit-pencil.svg";
import { api } from "../../utils/api";
import { QUESTION_DATA } from "../../constants/questions";
import { useLocation, useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";

function LeaderResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const room = useRoom();

  const isFromBoardEdit = Boolean(location.state?.isFromBoardEdit);

  const roomCode =
    room?.roomCode || sessionStorage.getItem("currentRoomCode") || "";
  const userIdStr = room?.userId || sessionStorage.getItem("userId") || "";
  const userId = userIdStr ? Number(userIdStr) : null;


  const categories = useMemo(() => {
    const base = QUESTION_DATA.map((q) => q.category);
    const unique = Array.from(new Set(base));
    return [...unique, "기타"];
  }, []);


  const getCategoryByQuestionId = useCallback((qid) => {
    const found = QUESTION_DATA.find((q) => q.id === Number(qid));
    return found?.category ?? "기타";
  }, []);

  const mapServerDataToRules = useCallback(
    (res) => {
      const list = Array.isArray(res) ? res : res?.data || res?.rules || [];
      return list.map((it) => ({
        id: it.id,
        questionId: it.questionId,
        category: getCategoryByQuestionId(it.questionId),
        text: it.rule ?? "",
      }));
    },
    [getCategoryByQuestionId]
  );

  const getQuestionIdByCategory = useCallback((category) => {
    if (category === "기타") return 6;
    const found = QUESTION_DATA.find((q) => q.category === category);
    return found?.id ?? 6;
  }, []);

  const [rules, setRules] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const [editingRuleId, setEditingRuleId] = useState(null);
  const [draftTextById, setDraftTextById] = useState({});


  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(categories[0] || "기타");
  const [addText, setAddText] = useState("");


  const isEditingRef = useRef(false);
  useEffect(() => {
    isEditingRef.current = Boolean(editingRuleId);
  }, [editingRuleId]);

 
  useEffect(() => {
    if (!roomCode || !userId) return;

    let mounted = true;

    const fetchSummary = async () => {
      try {
        const res = await api.getRuleSummary({ roomCode, userId });
        if (!mounted) return;

     
        if (!isEditingRef.current) {
          setRules(mapServerDataToRules(res));
        }

        if (res?.status === "COMPLETE" && !isFromBoardEdit) {
          navigate("/test/final", { replace: true });
        }
      } catch (e) {
        console.error("[LeaderResult] getRuleSummary failed:", e?.message || e);
      }
    };

    fetchSummary();
    const t = setInterval(fetchSummary, 2500);

    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [roomCode, userId, navigate, isFromBoardEdit, mapServerDataToRules]);


  const startEditRow = useCallback((r) => {
    setEditingRuleId(r.id);
    setDraftTextById((prev) => ({ ...prev, [r.id]: r.text || "" }));
  }, []);


  const submitEditRow = useCallback(
    async (ruleId) => {
      if (!roomCode || !userId) return;

      const nextText = String(draftTextById[ruleId] || "").trim();
      if (!nextText) return;

      setIsSaving(true);
      try {
        await api.updateSummaryRuleById({
          roomCode,
          userId,
          ruleId,
          opinion: nextText,
        });


        setRules((prev) =>
          prev.map((r) => (r.id === ruleId ? { ...r, text: nextText } : r))
        );

        setEditingRuleId(null);


        const res = await api.getRuleSummary({ roomCode, userId });
        setRules(mapServerDataToRules(res));
      } catch (e) {
        alert("수정 저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
      } finally {
        setIsSaving(false);
      }
    },
    [roomCode, userId, draftTextById, mapServerDataToRules]
  );


  const handleAddRule = useCallback(async () => {
    if (!roomCode || !userId) return;

    const txt = addText.trim();
    if (!txt) return;

    setIsSaving(true);
    try {
      const qid = getQuestionIdByCategory(addCategory);

      await api.addRuleToSummary({
        roomCode,
        userId,
        questionId: qid,
        category: addCategory,
        opinion: txt,
      });


      setAddText("");


      const res = await api.getRuleSummary({ roomCode, userId });
      setRules(mapServerDataToRules(res));
    } catch (e) {
      alert("규칙 추가에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  }, [
    roomCode,
    userId,
    addText,
    addCategory,
    getQuestionIdByCategory,
    mapServerDataToRules,
  ]);


  const handleGoFinal = useCallback(async () => {
    if (!roomCode || !userId) return;

    if (location.state?.isFromBoardEdit) {
      navigate("/board");
      return;
    }

    setIsSaving(true);
    try {
      await api.goFinalPage({ roomCode, userId });

    } catch (e) {
      alert("최종 완료 요청 실패");
    } finally {
      setIsSaving(false);
    }
  }, [roomCode, userId, location.state, navigate]);

  const disableFinal =
    rules.length === 0 || rules.some((r) => !String(r.text || "").trim());

  const roomTitle = room?.roomName ? `${room.roomName} 방의 규칙` : "우리방 규칙";
  const dateRangeText = String(location.state?.dateRange || "").trim();

  return (
    <Wrapper>
      <Header>
        <IconWrap>
          <img src={PencilTop} alt="pencil" />
        </IconWrap>
        <Title>규칙을 수정할 수 있어요</Title>
        <SubTitle>방장이 규칙을 수정하고 추가할 수 있어요</SubTitle>
      </Header>

      <Card>
        <CardHeaderRow>
          <CardHeaderLeft>
            <CardTitle>{roomTitle}</CardTitle>
            {dateRangeText ? <CardDate>{dateRangeText}</CardDate> : null}
          </CardHeaderLeft>
        </CardHeaderRow>

        <RuleList>
          {rules.map((r) => {
            const isEditing = editingRuleId === r.id;

            return (
              <RuleItem key={r.id}>
                <RuleTopRow>
                  <Pill>{r.category || "기타"}</Pill>

                  {!isEditing ? (
                    <IconBtn
                      type="button"
                      onClick={() => startEditRow(r)}
                      disabled={isSaving}
                      aria-label="edit"
                    >
                      <img src={EditPencil} alt="edit" />
                    </IconBtn>
                  ) : (
                    <TextActionBtn
                      type="button"
                      onClick={() => submitEditRow(r.id)}
                      disabled={
                        isSaving || !String(draftTextById[r.id] || "").trim()
                      }
                    >
                      수정 완료
                    </TextActionBtn>
                  )}
                </RuleTopRow>

                {!isEditing ? (
                  <RuleText>{r.text}</RuleText>
                ) : (
                  <RuleInput
                    value={draftTextById[r.id] ?? ""}
                    onChange={(e) =>
                      setDraftTextById((p) => ({ ...p, [r.id]: e.target.value }))
                    }
                    placeholder="규칙을 입력하세요"
                  />
                )}
              </RuleItem>
            );
          })}
        </RuleList>

        <AddToggleRow>
          <AddToggleBtn
            type="button"
            onClick={() => setIsAddOpen((p) => !p)}
          >
            규칙 추가하기
          </AddToggleBtn>
        </AddToggleRow>

        {isAddOpen && (
          <AddBox>
            <CategoryRow>
              {categories.map((c) => {
                const active = c === addCategory;
                return (
                  <CategoryPillBtn
                    key={c}
                    type="button"
                    $active={active}
                    onClick={() => setAddCategory(c)}
                    disabled={isSaving}
                  >
                    {c}
                  </CategoryPillBtn>
                );
              })}
            </CategoryRow>

            <AddInputRow>
              <AddInput
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
                placeholder="밤 11시에 소등하기"
                disabled={isSaving}
              />
              <TextActionBtn
                type="button"
                onClick={handleAddRule}
                disabled={isSaving || !addText.trim()}
              >
                추가 완료
              </TextActionBtn>
            </AddInputRow>
          </AddBox>
        )}
      </Card>

      <BottomArea>
        <Button onClick={handleGoFinal} disabled={disableFinal || isSaving}>
          {location.state?.isFromBoardEdit ? "수정완료" : "다음으로"}
        </Button>
      </BottomArea>
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

  @media (max-width: 780px) {
    padding: 72px 0 64px;
  }
`;

const Header = styled.div`
  width: 746px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 780px) {
    width: calc(100% - 32px);
  }
`;

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  margin-bottom: 10px;

  img {
    width: 52px;
    height: 52px;
    display: block;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: ${Colors.black};
  font-weight: 800;

  @media (max-width: 780px) {
    font-size: 24px;
  }
`;

const SubTitle = styled.p`
  margin: 12px 0 24px;
  color: ${Colors.fixGray};
  font-size: 14px;

  @media (max-width: 780px) {
    margin: 10px 0 20px;
  }
`;

const Card = styled.div`
  width: 746px;
  border-radius: 18px;
  background: ${Colors.white};
  box-shadow: 0 10px 28px ${Colors.boxShadowPurple};
  padding: 28px;
  box-sizing: border-box;

  @media (max-width: 780px) {
    width: calc(100% - 32px);
    padding: 18px;
    border-radius: 16px;
  }
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const CardHeaderLeft = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
`;

const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: ${Colors.black};
`;

const CardDate = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
`;

const RuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RuleItem = styled.div`
  width: 100%;
  border-radius: 16px;
  background: ${Colors.fixWhite};
  box-shadow: 0 8px 18px rgba(163, 163, 253, 0.18);
  padding: 16px 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 780px) {
    padding: 14px 14px;
  }
`;

const RuleTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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
  font-size: 16px;
  color: ${Colors.black};
  line-height: 1.35;

  @media (max-width: 780px) {
    font-size: 15px;
  }
`;

const RuleInput = styled.input`
  width: 100%;
  height: 46px;
  border: none;
  outline: none;
  background: ${Colors.white};
  border-radius: 12px;
  padding: 0 14px;
  box-shadow: inset 0 0 0 1px ${Colors.inputColor};
  font-size: 15px;
`;

const IconBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  display: grid;
  place-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  img {
    width: 22px;
    height: 22px;
    display: block;
  }
`;

const TextActionBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${Colors.mainPurple};
  font-weight: 800;
  font-size: 14px;
  white-space: nowrap;
  padding: 6px 4px;

  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const AddToggleRow = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const AddToggleBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${Colors.mainPurple};
  font-weight: 800;
  font-size: 14px;
  padding: 10px 0;
`;

const AddBox = styled.div`
  margin-top: 12px;
  border-radius: 16px;
  background: ${Colors.fixWhite};
  box-shadow: 0 8px 18px rgba(163, 163, 253, 0.18);
  padding: 16px;

  @media (max-width: 780px) {
    padding: 14px;
  }
`;

const CategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
`;

const CategoryPillBtn = styled.button`
  border: none;
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 12px;

  background: ${({ $active }) =>
    $active ? Colors.mainPurple : "rgba(141, 132, 255, 0.18)"};
  color: ${({ $active }) => ($active ? Colors.white : Colors.mainPurple)};

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const AddInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const AddInput = styled.input`
  flex: 1;
  height: 48px;
  border: none;
  outline: none;
  background: ${Colors.white};
  border-radius: 12px;
  padding: 0 14px;
  box-shadow: inset 0 0 0 1px ${Colors.inputColor};

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const BottomArea = styled.div`
  width: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-top: 22px;

  @media (max-width: 780px) {
    width: calc(100% - 32px);
  }
`;