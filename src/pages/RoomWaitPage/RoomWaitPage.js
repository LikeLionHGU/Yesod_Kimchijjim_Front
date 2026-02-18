
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Colors } from "../../styles/colors";
import styled from "styled-components";
import GoBackPage from "../../components/common/BackButton";
import WaitPageIcon from "../../assets/waitPageIcon.svg";

const RoomWaitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const roomCode =
    location.state?.roomCode ||
    location.state?.code ||
    sessionStorage.getItem("currentRoomCode") ||
    "??????";

  const isLeader = sessionStorage.getItem("isLeader") === "true";

  const [roomStatus, setRoomStatus] = useState({
    isFull: false,
    currentPeople: 0,
    maxPeople: 0,
  });

  useEffect(() => {
    if (roomCode !== "??????") {
      sessionStorage.setItem("currentRoomCode", roomCode);
    }
  }, [roomCode]);

  useEffect(() => {
    const checkStatus = async () => {
      if (roomCode === "??????") return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST_URL}/rooms/${roomCode}/waiting`,
          { withCredentials: true }
        );

        const { isFull, currentPeople, maxPeople } = response.data;

        setRoomStatus({
          isFull,
          currentPeople,
          maxPeople,
        });

        const isActuallyFull =
          isFull === true ||
          currentPeople >= maxPeople ||
          response.data.full === true;

        if (isActuallyFull) {
          navigate("/room/test", {
            state: { roomCode },
            replace: true,
          });
        }
      } catch (error) {
        console.error("방 상태를 불러오는 중 오류 발생:", error);
      }
    };

    const intervalId = setInterval(checkStatus, 3000);
    checkStatus();

    return () => clearInterval(intervalId);
  }, [roomCode, navigate]);

  return (
    <PageContainer>
      <GoBackPage />
      <TitleGroup>
        <Title>대기실</Title>
        <SubTitle>모든 룸메이트가 입장하길 기다리고 있어요</SubTitle>
      </TitleGroup>
      <WaitImg src={WaitPageIcon}/>
      <Card>
        <CodeGroup>
          <Label>방 코드</Label>
          <Code>{roomCode}</Code>
        </CodeGroup>
      </Card>
    </PageContainer>
  );
};

export default RoomWaitPage;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding-top: 43px;
  padding-bottom: 186px;
  position: relative;
  box-sizing: border-box;
`;

const TitleGroup = styled.div`
    text-align: center;
    margin-bottom: 87px;
`;

const Title = styled.p`
    color: ${Colors.black};
    text-align: center;
    font-family: ${Colors.font};
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    margin-top: 121px;
    margin-bottom: 15px;
`;

const SubTitle = styled.p`
    color: ${Colors.detailBlack};
    text-align: center;
    font-family: ${Colors.font};
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 0;
`;

const WaitImg = styled.img`
  width: 408px;
  margin-bottom: 87px;
`;

const Card = styled.div`
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
  width: 556px;
  height: 86px;
  box-sizing: border-box;
  padding: 13px 0;
  gap: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 186px;
`;

const CodeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
  align-items: center;
`;

const Label = styled.label`
  margin: 0;
  display: block;
  font-weight: 700;
  line-height: 15px;
  font-family: ${Colors.font};
  font-size: 15px;
  font-style: normal;
  color: ${Colors.detailBlack};
`;

const Code = styled.div`
  color: ${Colors.black};
  text-align: center;
  font-family: ${Colors.font};
  font-size: 27px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 5.4px;
`;
