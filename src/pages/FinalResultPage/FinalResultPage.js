
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";
import { QUESTION_DATA } from "../../constants/questions";

import StampIcon from "../../assets/stamp.svg";
import HomeIcon from "../../assets/homeIcon.svg";

function FinalResultPage() {
  const navigate = useNavigate();
  const room = useRoom();

  const roomCode =
    room?.roomCode || sessionStorage.getItem("currentRoomCode") || "";
  const userIdStr = room?.userId || sessionStorage.getItem("userId") || "";
  const userId = userIdStr ? Number(userIdStr) : null;

  const cardCaptureRef = useRef(null);

  const [rules, setRules] = useState(null);
  const [error, setError] = useState(false);

  const getCategoryByQuestionId = useCallback((qid) => {
    const found = QUESTION_DATA.find((q) => q.id === Number(qid));
    return found?.category ?? "기타";
  }, []);

  const mappedRules = useMemo(() => {
    if (!Array.isArray(rules)) return [];
    return rules.map((r) => ({
      id: r.id,
      questionId: r.questionId,
      text: r.rule,
      category: getCategoryByQuestionId(r.questionId),
    }));
  }, [rules, getCategoryByQuestionId]);

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
        setRules(null);

        const res = await api.getFinalRules({ roomCode, userId });
        if (!mounted) return;

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

  const handleMoveToBoard = useCallback(() => {
    navigate("/board");
  }, [navigate]);

  const handleSaveImage = useCallback(async () => {
    try {
      const { default: html2canvas } = await import("html2canvas");

      const node = cardCaptureRef.current;
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
      alert(
        "이미지 저장 기능을 쓰려면 html2canvas 설치가 필요해요. (npm i html2canvas)"
      );
    }
  }, [roomCode]);

  const roomTitle = room?.roomName ? `${room.roomName} 방의 규칙` : "우리방 규칙";
  const dateRangeText = "";

  return (
    <Wrapper>
      <TopArea>
        <StampWrap>
          <img src={StampIcon} alt="stamp" />
        </StampWrap>

        <Title>규칙이 완성되었어요!</Title>
        <SubTitle>우리방의 규칙을 사진으로 저장하고 공유해보세요</SubTitle>
      </TopArea>

      <CaptureCard ref={cardCaptureRef}>
        <CardHeader>
          <LeftHeader>
            <CardTitle>{roomTitle}</CardTitle>
            {dateRangeText ? <CardDate>{dateRangeText}</CardDate> : null}
          </LeftHeader>

          <SaveTextBtn type="button" onClick={handleSaveImage}>
            이미지 저장
          </SaveTextBtn>
        </CardHeader>

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
      </CaptureCard>

      
      <BottomArea>
        <HomeBtn
          type="button"
          onClick={handleMoveToBoard}
          disabled={rules === null || error}
        >
          <img src={HomeIcon} alt="home" />
          <span>메인 페이지</span>
        </HomeBtn>
      </BottomArea>
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
  padding: 50px 0 80px;

  @media (max-width: 780px) {
    padding: 50px 0 64px;
  }
`;

const TopArea = styled.div`
  width: 746px;
  text-align: center;

  @media (max-width: 820px) {
    width: calc(100% - 32px);
  }
`;

const StampWrap = styled.div`
  width: 146px;
  height: 121px;
  margin: 0 auto 10px;
  display: grid;
  place-items: center;

  img {
    width: 146px;
    height: 121px;
    display: block;
    object-fit: contain;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 25px;
  font-weight: 700;
  color: ${Colors.black};
  text-align: center;
`;

const SubTitle = styled.p`
  margin: 10px 0 36px;
  font-size: 16px;
  color: ${Colors.fixGray};
  text-align: center;
`;

const CaptureCard = styled.div`
  width: 746px;
  border-radius: 18px;
  background: ${Colors.white};
  box-sizing: border-box;

  border: 2px solid ${Colors.mainPurple};
  box-shadow: 0 0 20px ${Colors.boxShadowPurple};

  padding: 40px 90px 34px;

  @media (max-width: 820px) {
    width: calc(100% - 32px);
    padding: 16px 14px 20px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

const LeftHeader = styled.div`
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

const CardDate = styled.div`
  font-size: 12px;
  color: ${Colors.fixGray};
`;

const SaveTextBtn = styled.button`
  border: none;
  background: transparent;
  color: ${Colors.mainPurple};
  font-weight: 800;
  cursor: pointer;
  padding: 6px 8px;
  white-space: nowrap;
`;

const RuleList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding: 0;
  box-sizing: border-box;
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
  gap: 10px;

  @media (max-width: 480px) {
    padding: 14px 14px;
  }
`;

const Pill = styled.div`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-style: normal;
  line-height: 12px;
  color: ${Colors.white};
  background: ${Colors.secondPurple};
  white-space: nowrap;
  font-weight: 500;
`;

const RuleText = styled.div`
  flex: 1;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  color: ${Colors.black};
  word-break: break-word;
  line-height: 1.35;
`;

const EmptyText = styled.div`
  width: 100%;
  text-align: center;
  color: ${Colors.fixGray};
  font-size: 14px;
  padding: 18px 0;
`;


const BottomArea = styled.div`
  width: 746px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 22px;

  @media (max-width: 820px) {
    width: calc(100% - 32px);
  }
`;

const HomeBtn = styled.button`
  border: none;
  background: transparent;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: ${Colors.mainPurple};
  font-weight: 800;
  padding: 8px 6px;

  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  img {
    width: 84px;
    height: 84px;
    display: block;
  }

  span {
    font-size: 12px;
    line-height: 12px;
  }
`;