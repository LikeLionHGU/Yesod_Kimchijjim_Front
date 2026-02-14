
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";
import { QUESTION_DATA } from "../../constants/questions";

function FinalResultPage() {
  const navigate = useNavigate();
  const room = useRoom();

  const roomCode =
    room?.roomCode || sessionStorage.getItem("currentRoomCode") || "";
  const userIdStr = room?.userId || sessionStorage.getItem("userId") || "";
  const userId = userIdStr ? Number(userIdStr) : null;

  const captureRef = useRef(null);

  const [rules, setRules] = useState(null); 
  const [error, setError] = useState(false);

  const getCategoryByQuestionId = (qid) => {
    const found = QUESTION_DATA.find((q) => q.id === qid);
    return found?.category ?? "기타";
  };

  const mappedRules = useMemo(() => {
    if (!rules) return [];
    // 백엔드: { id, rule, questionId }
    return rules.map((r) => ({
      id: r.id,
      questionId: r.questionId,
      text: r.rule,
      category: getCategoryByQuestionId(r.questionId),
    }));
  }, [rules]);

  useEffect(() => {
    if (!roomCode || !userId) {
      setError(true);
      setRules([]);
      return;
    }

    let mounted = true;

    (async () => {
      try {
        setError(false);
        setRules(null); // 로딩 시작

        const res = await api.getFinalRules({ roomCode, userId });

        if (!mounted) return;
        // res.data가 최종 룰 목록
        setRules(res?.data || []);
      } catch (e) {
        console.error("[FinalResultPage] getFinalRules failed:", e?.message || e);
        if (!mounted) return;
        setError(true);
        setRules([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [roomCode, userId]);

  // 각자 보드로 이동 (서버 동기화 X)
  const handleMoveToBoard = () => {
    navigate("/board");
  };

  const handleSaveImage = async () => {
    try {
      const { default: html2canvas } = await import("html2canvas");

      const node = captureRef.current;
      if (!node) return;

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `rules_${roomCode}.png`;
      a.click();
    } catch (e) {
      console.error(e);
      alert("이미지 저장 기능을 쓰려면 html2canvas 설치가 필요해요. (npm i html2canvas)");
    }
  };

  return (
    <Wrapper>
      <CaptureArea ref={captureRef}>
        <Header>
          <Title>규칙이 완성되었어요!</Title>
          <SubTitle>우리방의 규칙을 사진으로 저장하고 공유해보세요</SubTitle>
        </Header>

        <RuleList>
          {rules === null && !error && (
            <EmptyText>최종 규칙을 불러오는 중이에요...</EmptyText>
          )}

          {error && (
            <EmptyText>규칙을 불러오지 못했어요. 다시 접속해 주세요.</EmptyText>
          )}

          {rules !== null &&
            !error &&
            mappedRules.map((r) => (
              <RuleItem key={`${r.id}-${r.questionId}`}>
                <Pill>{r.category}</Pill>
                <RuleText>{r.text}</RuleText>
              </RuleItem>
            ))}
        </RuleList>
      </CaptureArea>

      <Bottom>
        <SmallBtn type="button" onClick={handleSaveImage}>
          이미지 저장
        </SmallBtn>

        <Button onClick={handleMoveToBoard} disabled={rules === null || error}>
          메인 페이지
        </Button>
      </Bottom>
    </Wrapper>
  );
}

export default FinalResultPage;


const Wrapper = styled.div`
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 0 80px;
`;

const CaptureArea = styled.div`
  width: 746px;

  @media (max-width: 820px) {
    width: calc(100% - 32px);
  }
`;

const Header = styled.div`
  width: 100%;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RuleItem = styled.div`
  width: 100%;
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
  word-break: break-word;
`;

const Bottom = styled.div`
  width: 746px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;

  @media (max-width: 820px) {
    width: calc(100% - 32px);
  }
`;

const SmallBtn = styled.button`
  border: none;
  background: transparent;
  color: ${Colors.mainPurple};
  font-weight: 800;
  cursor: pointer;
`;

const EmptyText = styled.div`
  width: 100%;
  text-align: center;
  color: ${Colors.fixGray};
  font-size: 14px;
  padding: 20px 0;
`;
