import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { Colors } from "../../styles/colors";
import TitleSection from "../../components/common/TitleSection";
import Button from "../../components/common/Button";
import Ellipse5 from "../../assets/Ellipse 5.svg";

function FinalResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // state 없으면 잘못 진입 → 홈
  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  const roomTitle = state?.roomTitle ?? "우리방의 규칙";
  const periodText = state?.periodText ?? "";
  const rules = state?.rules ?? [];

  // 규칙보드 부분만 캡처해야하
  const boardRef = useRef(null);

  const handleDownloadPng = async () => {
    if (!boardRef.current) return;

    // 규칙박스만 캡쳐
    //npm i html2canvas
    const canvas = await html2canvas(boardRef.current, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "room-rules.png";
    a.click();
  };

  const handleGoNext = () => {
    // navigate("/board");
    alert("보드페이지 언제만들지");
  };

  return (
    <Wrapper>
      <TitleSection
        iconSrc={Ellipse5}
        titleText="규칙이 완성되었어요!"
        subTitleText="우리방의 규칙을 사진으로 저장하고 공유해보세요"
      />

      <CaptureBox ref={boardRef}>
        <CaptureHeader>
          <HeaderLeft>
            <BoardTitle>{roomTitle}</BoardTitle>
            {periodText && <BoardPeriod>{periodText}</BoardPeriod>}
          </HeaderLeft>

          <SaveLink type="button" onClick={handleDownloadPng}>
            이미지 저장
          </SaveLink>
        </CaptureHeader>

        <RuleList>
          {rules.map((r, idx) => (
            <RuleItem key={r.id ?? idx}>
              <Keyword>키워드</Keyword>
              <RuleText>{r.text}</RuleText>
            </RuleItem>
          ))}
        </RuleList>
      </CaptureBox>

      <BottomBtnWrap>
        <ButtonWrap>
          <Button onClick={handleGoNext}>규칙 저장하기</Button>
        </ButtonWrap>
      </BottomBtnWrap>
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
  padding-bottom: 100px;
`;

const CaptureBox = styled.div`
  width: 936px;
  background: ${Colors.white};
  border-radius: 15px;
  padding: 24px 24px 28px;
  box-sizing: border-box;


  border: 1px solid ${Colors.mainPurple};
`;

const CaptureHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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

const SaveLink = styled.button`
  border: none;
  background: transparent;
  color: ${Colors.mainPurple};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
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
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.06);
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
  color: ${Colors.black};
`;

const BottomBtnWrap = styled.div`
  width: 936px;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

const ButtonWrap = styled.div`
  width: 175px;
  display: flex;
  justify-content: flex-end;
`;
