

import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import PencilTop from "../../assets/Pencil_purple.svg";
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

  const [rules, setRules] = useState([]); 
  const [status, setStatus] = useState("MODIFYING");

  const getCategoryByQuestionId = useCallback((qid) => {
    const found = QUESTION_DATA.find((q) => q.id === Number(qid));
    return found?.category ?? "기타";
  }, []);

  const mappedRules = useMemo(() => {
    return (rules || []).map((it) => ({
      id: it.id,
      questionId: it.questionId,
      category: getCategoryByQuestionId(it.questionId),
      text: it.rule ?? "",
    }));
  }, [rules, getCategoryByQuestionId]);

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

  const roomTitle = room?.roomName ? `${room.roomName} 방의 규칙` : "우리방 규칙";

  return (
    <Wrapper>
      <Header>
        <IconWrap>
          <img src={PencilTop} alt="pencil" />
        </IconWrap>

        <Title>규칙을 확인해요</Title>
        <SubTitle>
          {status === "COMPLETE"
            ? "최종 페이지로 이동할게요"
            : "방장이 규칙을 정리하고 있어요"}
        </SubTitle>
      </Header>

      <Card>
        <CardHeaderRow>
          <CardHeaderLeft>
            <CardTitle>{roomTitle}</CardTitle>
          </CardHeaderLeft>
        </CardHeaderRow>

        <RuleList>
          {mappedRules.map((r) => (
            <RuleItem key={r.id || `${r.questionId}-${r.text}`}>
              <RuleTopRow>
                <Pill>{r.category || "기타"}</Pill>
              </RuleTopRow>

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
  padding: 50px 0 80px;

  @media (max-width: 780px) {
    padding: 50px 0 64px;
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
    width: 60px;
    height: 60px;
    display: block;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 25px;
  color: ${Colors.black};
  font-weight: 700;
  text-align: center;
`;

const SubTitle = styled.p`
  margin: 10px 0 36px;
  color: ${Colors.fixGray};
  font-size: 16px;
  text-align: center;
`;

const Card = styled.div`
  width: 746px;
  border-radius: 18px;
  background: ${Colors.white};
  box-shadow: 0 0 20px ${Colors.boxShadowPurple};
  padding: 40px 90px;
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
  font-size: 15px;
  font-weight: 800;
  color: ${Colors.black};
`;

const RuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RuleItem = styled.div`
  width: 100%;
  border-radius: 16px;
  background: ${Colors.white};
  box-shadow: 0 0 10px ${Colors.boxShadowBlack};
  padding: 16px 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;

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
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
  color: ${Colors.white};
  background: ${Colors.secondPurple};
  white-space: nowrap;
`;

const RuleText = styled.div`
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  color: ${Colors.black};
  line-height: 1.35;

  @media (max-width: 780px) {
    font-size: 15px;
  }
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

