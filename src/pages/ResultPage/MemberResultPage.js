
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import Pencil from "../../assets/Pencil_purple.svg";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { QUESTION_DATA } from "../../constants/questions";
import { useRoom } from "../../context/RoomContext";

function MemberResultPage() {
  const navigate = useNavigate();
  const room = useRoom();

  const roomCode =
    room?.roomCode || sessionStorage.getItem("currentRoomCode") || "";
  const userIdStr = room?.userId || sessionStorage.getItem("userId") || "";
  const userId = userIdStr ? Number(userIdStr) : null;

  const [rules, setRules] = useState([]); // server raw
  const [status, setStatus] = useState("MODIFYING");

  const getCategoryByQuestionId = (qid) => {
    const found = QUESTION_DATA.find((q) => q.id === Number(qid));
    return found?.category ?? "기타";
  };

  const mappedRules = useMemo(() => {
    return (rules || []).map((it) => ({
      id: it.id,
      questionId: it.questionId,
      category: getCategoryByQuestionId(it.questionId),
      text: it.rule ?? "",
    }));
  }, [rules]);

  useEffect(() => {
    if (!roomCode || !userId) return;

    let mounted = true;

    const fetchSummary = async () => {
      try {
        const res = await api.getRuleSummary({ roomCode, userId });
        if (!mounted) return;

        setStatus(res?.status || "MODIFYING");
        setRules(res?.data || []);

        if (res?.status === "COMPLETE") {
          navigate("/test/final", { replace: true });
        }
      } catch (e) {
        console.error("[MemberResult] getRuleSummary failed:", e?.message || e);
      }
    };

    fetchSummary();
    const t = setInterval(fetchSummary, 2500);

    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [roomCode, userId, navigate]);

  return (
    <Wrapper>
      <Header>
        <IconWrap>
          <img src={Pencil} alt="pencil" />
        </IconWrap>

        <Title>규칙을 확인해요</Title>
        <SubTitle>
          {status === "COMPLETE"
            ? "최종 페이지로 이동할게요"
            : "방장이 규칙을 정리하고 있어요"}
        </SubTitle>
      </Header>

      <Card>
        <RuleList>
          {mappedRules.map((r) => (
            <RuleItem key={r.id || `${r.questionId}-${r.text}`}>
              <Pill>{r.category || "기타"}</Pill>
              <RuleText>{r.text}</RuleText>
            </RuleItem>
          ))}
        </RuleList>
      </Card>

      <Hint>방장이 완료를 누르면 자동으로 넘어가요.</Hint>
    </Wrapper>
  );
}

export default MemberResultPage;



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
`;

const SubTitle = styled.p`
  margin: 12px 0 24px;
  color: ${Colors.fixGray};
  font-size: 14px;
`;

const Card = styled.div`
  width: 746px;
  border-radius: 18px;
  background: ${Colors.white};
  box-shadow: 0 10px 28px ${Colors.boxShadowPurple};
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 780px) {
    width: calc(100% - 32px);
  }
`;

const RuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RuleItem = styled.div`
  width: 100%;
  border-radius: 15px;
  background: ${Colors.fixWhite};
  box-shadow: 0 8px 22px ${Colors.boxShadowPurple};
  padding: 16px 16px;
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
  line-height: 1.35;
`;

const Hint = styled.div`
  width: 746px;
  margin-top: 18px;
  text-align: right;
  font-size: 12px;
  color: ${Colors.mainPurple};

  @media (max-width: 780px) {
    width: calc(100% - 32px);
  }
`;
