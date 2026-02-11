import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import Button from "../../components/common/Button";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../../context/RoomContext";

function FinalResultPage() {
  const navigate = useNavigate();
  const { roomCode, userId, amIHost } = useRoom();

  const captureRef = useRef(null);

  const [rules, setRules] = useState([]);
  const [isMoving, setIsMoving] = useState(false);

  // Final 규칙 불러오기
  useEffect(() => {
    if (!roomCode || !userId) return;

    let mounted = true;

    (async () => {
      try {
        const res = await api.getFinalRules({ roomCode, userId });

        // { data: [{ questionId, category, rule }, ...] }
        if (!mounted) return;
        setRules(res?.data || []);
      } catch (e) {
        console.error(e);
        setRules([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [roomCode, userId]);

  // 집 아이콘 선택하모 -> 보드페이지로
  const handleMoveToBoard = async () => {
    if (!roomCode || !userId) return;

    setIsMoving(true);
    try {
     
      await api.selectHouseIcon({ roomCode, userId });

      navigate("/board", { replace: true });
    } catch (e) {
      console.error(e);
      alert("보드로 이동에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsMoving(false);
    }
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
          <Title>우리 방 규칙</Title>
          <SubTitle>{amIHost ? "방장 확정본" : "최종 확정본"}</SubTitle>
        </Header>

        <RuleList>
          {rules.length === 0 ? (
            <EmptyText>최종 규칙을 불러오는 중이에요...</EmptyText>
          ) : (
            rules.map((r, idx) => (
              <RuleItem key={`${r.questionId}-${idx}`}>
                <Pill>{r.category || "기타"}</Pill>
                <RuleText>{r.rule}</RuleText>
              </RuleItem>
            ))
          )}
        </RuleList>
      </CaptureArea>

      <Bottom>
        <SmallBtn type="button" onClick={handleSaveImage}>
          이미지 저장
        </SmallBtn>

        <Button onClick={handleMoveToBoard} disabled={rules.length === 0 || isMoving}>
          규칙 저장하기
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
