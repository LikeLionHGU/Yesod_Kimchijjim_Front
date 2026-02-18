
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import { api } from "../../utils/api";
import { ensurePushSubscribed } from "../../utils/push";


const TABS = {
  RECOMMEND: "RECOMMEND",
  DIRECT: "DIRECT",
};

const TOPICS = [
  { key: "NOISE", label: "소음", icon: "🔈" },
  { key: "LIGHT", label: "빛", icon: "💡" },
  { key: "LIFE", label: "생활 패턴", icon: "🧹" },
  { key: "HABIT", label: "습관", icon: "🔁" },
];

const RECOMMEND_TEXT = {
  NOISE: [
    "알람 소리가 너무 오래 울렸어요",
    "밤 늦은 시간 통화 소리가 들렸어요",
    "키보드 소리가 조금 신경 쓰였어요",
  ],
  LIGHT: [
    "스탠드 조명을 조금 줄여주세요",
    "노트북, 핸드폰 화면 밝기가 너무 밝아요",
    "소등 시간을 잘 지키면 좋겠어요",
  ],
  LIFE: [
    "아침 일찍 나갈 때 조용히 나가주세요",
    "늦은 시간 들어올 때 불빛과 소음 주의해주세요",
    "누군가 자고 있을 때 조용히 해주세요",
  ],
  HABIT: [
    "음식을 먹고 환기를 시켜주세요",
    "빨래가 건조되면 바로 정리해주세요",
    "외부인 출입 시 미리 얘기해주세요",
  ],
};

function BoardOpinionSection() {
  const roomCode = sessionStorage.getItem("currentRoomCode") || "";
  const nickname = sessionStorage.getItem("nickname") || "익명";


  const myUserIdStr = sessionStorage.getItem("userId") || "";
  const myUserId = myUserIdStr ? Number(myUserIdStr) : null;

  


  const [items, setItems] = useState([]);

  const [tab, setTab] = useState(TABS.RECOMMEND);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedRecommend, setSelectedRecommend] = useState("");
  const [directText, setDirectText] = useState("");

  const [isSending, setIsSending] = useState(false);

  const mappedItems = useMemo(() => {
    
    return (items || []).map((it) => ({
      id: it.id,
      nickname: it.nickname || "익명",
      text: it.content ?? "",
      
      createdAt: mergeDateTime(it.createdDate, it.createdTime),
      
      type: "DIRECT",
    }));
  }, [items]);

  const fetchOpinions = async () => {
    if (!roomCode) return;
    try {
      const res = await api.getOpinions({ roomCode });
      
      const list = Array.isArray(res) ? res : res?.data;
      setItems(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("[BoardOpinionSection] getOpinions failed:", e?.message || e);
    }
  };
  

  useEffect(() => {
    if (!roomCode) return;

    let mounted = true;

    const run = async () => {
      if (!mounted) return;
      await fetchOpinions();
    };

    run();
    const t = setInterval(run, 2500);

    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [roomCode]);

  const handleSend = async () => {
    if (!roomCode || isSending) return;

    const content =
      tab === TABS.RECOMMEND ? String(selectedRecommend || "").trim() : String(directText || "").trim();

    if (!content) return;

    setIsSending(true);
    try {
      await api.createOpinion({ roomCode, content });

      
      if (tab === TABS.RECOMMEND) setSelectedRecommend("");
      else setDirectText("");

      
      await fetchOpinions();
    } catch (e) {
      console.error("[BoardOpinionSection] createOpinion failed:", e?.message || e);
      alert("의견 등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSending(false);
    }
  };

  const canSend =
    tab === TABS.RECOMMEND
      ? Boolean(selectedTopic && selectedRecommend.trim())
      : Boolean(directText.trim());

  const onKeyDownDirect = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Grid>
      {/*의견*/}
      <BoardCard>
        <HeaderRow>
          <SectionTitle>의견 보드</SectionTitle>
          <SmallHint>----------</SmallHint>
        </HeaderRow>

        {mappedItems.length === 0 ? (
          <Empty>아직 의견이 없어요</Empty>
        ) : (
          // <List>
          //   {mappedItems.map((it) => (
          //     <Item key={it.id}>
          //       <ItemTop>
          //         <Name>{it.nickname || "익명"}</Name>
          //         <Right>
          //           <TimeText>{it.createdAt}</TimeText>
                    
          //         </Right>
          //       </ItemTop>

          //       <ItemText>{it.text}</ItemText>
          //     </Item>
          //   ))}
          // </List>
          <List>
  {items.map((it) => {
    const isMine =
      myUserId != null && Number(it.authorId) === Number(myUserId);

    return (
      <Item key={it.id} $mine={isMine}>
        <ItemTop>
          <Name>{it.nickname || "익명"}</Name>
          <Right>
            <TimeText>{it.createdDate} {it.createdTime}</TimeText>
          </Right>
        </ItemTop>

        <ItemText>{it.content}</ItemText>
      </Item>
    );
  })}
</List>

        )}
      </BoardCard>

      
      <WriteCard>
        <WriteTitle>의견 남기기</WriteTitle>

        <Tabs>
          <TabBtn
            type="button"
            $active={tab === TABS.RECOMMEND}
            onClick={() => setTab(TABS.RECOMMEND)}
          >
            문구 추천받기
          </TabBtn>
          <TabBtn
            type="button"
            $active={tab === TABS.DIRECT}
            onClick={() => setTab(TABS.DIRECT)}
          >
            직접 입력하기
          </TabBtn>
        </Tabs>


        {tab === TABS.RECOMMEND ? (
          <>
            <BlockTitle>불편하거나 조율하고 싶은 주제를 선택해주세요</BlockTitle>

            <TopicGrid>
              {TOPICS.map((t) => (
                <TopicBtn
                  key={t.key}
                  type="button"
                  $active={selectedTopic === t.key}
                  onClick={() => {
                    setSelectedTopic(t.key);
                    setSelectedRecommend("");
                  }}
                >
                  <TopicIcon>{t.icon}</TopicIcon>
                  {t.label}
                </TopicBtn>
              ))}
            </TopicGrid>

            <BlockTitle style={{ marginTop: 14 }}>
              아래 추천 문구 중 하나를 선택해주세요
            </BlockTitle>

            <RecommendList>
              {(selectedTopic ? RECOMMEND_TEXT[selectedTopic] || [] : RECOMMEND_TEXT.NOISE).map((txt) => (
                <RecommendBtn
                  key={txt}
                  type="button"
                  $active={selectedRecommend === txt}
                  onClick={() => setSelectedRecommend(txt)}
                >
                  {txt}
                </RecommendBtn>
              ))}
            </RecommendList>
          </>
        ) : (
          <>
            <BlockTitle>불편하거나 조율하고 싶은 내용을 직접 입력하세요</BlockTitle>
            <DirectInput
              value={directText}
              onChange={(e) => setDirectText(e.target.value)}
              onKeyDown={onKeyDownDirect}
              placeholder="내용을 작성하세요"
            />
          </>
        )}

        <SendWrap>
          <SendBtn
            type="button"
            onClick={handleSend}
            disabled={!canSend || isSending || !roomCode}
          >
            {isSending ? "전송 중..." : "전송하기"}
          </SendBtn>
        </SendWrap>
      </WriteCard>
    </Grid>
  );
}

export default BoardOpinionSection;

function mergeDateTime(createdDate, createdTime) {
  
  if (!createdDate && !createdTime) return "";
  const d = String(createdDate || "");
  const t = String(createdTime || "");
 
  try {
    if (d && t) {
      const mm = d.split("-")[1] || "";
      const dd = d.split("-")[2] || "";
      const hhmm = t.slice(0, 5);
      return `${mm}.${dd} ${hhmm}`;
    }
    return `${d} ${t}`.trim();
  } catch {
    return `${d} ${t}`.trim();
  }
}



const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BoardCard = styled.div`
  width: 100%;
  background: ${Colors.white};
  border-radius: 18px;
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
  padding: 22px 22px;
  box-sizing: border-box;
`;

const WriteCard = styled.div`
  width: 100%;
  background: ${Colors.white};
  border-radius: 18px;
  box-shadow: 0 8px 24px ${Colors.boxShadowPurple};
  padding: 22px 22px;
  box-sizing: border-box;
  border: 1px solid ${Colors.mainPurple};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: ${Colors.black};
`;

const SmallHint = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
`;

const Empty = styled.div`
  text-align: center;
  color: ${Colors.fixGray};
  font-size: 14px;
  padding: 18px 0 6px;
`;

const List = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 420px;
  overflow: auto;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${Colors.borderLine};
    border-radius: 999px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;



const Item = styled.div`
  border-radius: 14px;
  padding: 14px 16px;

  background: ${({ $mine }) => ($mine ? Colors.fixWhite : Colors.boxShadowPurple)};
`;

const ItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Name = styled.div`
  font-weight: 800;
  font-size: 14px;
  color: ${Colors.black};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TimeText = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
`;

const ItemText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${Colors.black};
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
`;

const WriteTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 900;
  color: ${Colors.black};
`;

const Tabs = styled.div`
  display: flex;
  gap: 16px;
  border-bottom: 1px solid ${Colors.borderLine};
  padding-bottom: 10px;
`;

const TabBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 8px 0;
  font-weight: 900;
  color: ${({ $active }) => ($active ? Colors.mainPurple : Colors.fixGray)};
  border-bottom: ${({ $active }) =>
    $active ? `2px solid ${Colors.mainPurple}` : "2px solid transparent"};
`;


const BlockTitle = styled.div`
  margin-top: 14px;
  font-size: 13px;
  font-weight: 800;
  color: ${Colors.black};
`;

const TopicGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const TopicBtn = styled.button`
  height: 46px;
  border-radius: 12px;
  border: 1px solid
    ${({ $active }) => ($active ? Colors.mainPurple : Colors.borderLine)};
  background: ${Colors.white};
  cursor: pointer;
  font-weight: 800;
  color: ${({ $active }) => ($active ? Colors.mainPurple : Colors.black)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${Colors.fixWhite};
  }
`;

const TopicIcon = styled.span`
  font-size: 14px;
`;

const RecommendList = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RecommendBtn = styled.button`
  height: 46px;
  border-radius: 12px;
  border: 1px solid
    ${({ $active }) => ($active ? Colors.mainPurple : Colors.borderLine)};
  background: ${Colors.white};
  cursor: pointer;
  font-weight: 700;
  color: ${({ $active }) => ($active ? Colors.mainPurple : Colors.black)};
  text-align: left;
  padding: 0 14px;

  &:hover {
    background: ${Colors.fixWhite};
  }
`;

const DirectInput = styled.textarea`
  margin-top: 10px;
  min-height: 46px;
  height: 46px;
  border-radius: 12px;
  border: 1px solid ${Colors.borderLine};
  padding: 12px 12px;
  font-size: 14px;
  outline: none;
  resize: none;
  background: ${Colors.fixWhite};
  line-height: 1.4;

  &:focus {
    border: 1px solid ${Colors.mainPurple};
    background: ${Colors.fixWhite};
  }
`;

const SendWrap = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
`;

const SendBtn = styled.button`
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 900;
  color: ${Colors.white};
  background: ${Colors.mainPurple};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


