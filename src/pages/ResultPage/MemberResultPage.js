import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { QUESTION_DATA } from "../../constants/questions";
import { useRoom } from "../../context/RoomContext";

function MemberResultPage() {
  const navigate = useNavigate();
  const { roomCode, userId } = useRoom();

  const [rules, setRules] = useState([]);
  const [status, setStatus] = useState("MODIFYING");

  const getCategoryByQuestionId = (qid) => {
    const found = QUESTION_DATA.find((q) => q.id === qid);
    return found?.category ?? "기타";
  };

  const mappedRules = useMemo(() => {
    return (rules || []).map((it) => ({
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
        const res = await api.getRulesSummary({ roomCode, userId });
        if (!mounted) return;

        setStatus(res?.status || "MODIFYING");
        setRules(res?.data || []);

        // 방장이 완료 눌러서 COMPLETE되면 --> 최종으로 이동
        if (res?.status === "COMPLETE") {
          navigate("/test/final", { replace: true });
        }
      } catch (e) {}
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
        <Title>규칙을 확인해요</Title>
        <SubTitle>
          {status === "COMPLETE"
            ? "최종 페이지로 이동할게요"
            : "방장이 규칙을 정리하고 있어요"}
        </SubTitle>
      </Header>

      <RuleList>
        {mappedRules.map((r) => (
          <RuleItem key={`${r.questionId}-${r.text}`}>
            <Pill>{r.category || "기타"}</Pill>
            <RuleText>{r.text}</RuleText>
          </RuleItem>
        ))}
      </RuleList>

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

const Hint = styled.div`
  width: 746px;
  margin-top: 18px;
  text-align: right;
  font-size: 12px;
  color: ${Colors.mainPurple};
`;
