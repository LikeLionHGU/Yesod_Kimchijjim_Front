import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import BoardTopSection from "./BoardTopSection";
import BoardOpinionSection from "./BoardOpinionSection";

const BoardPage = () => {
  const [roomInfo, setRoomInfo] = useState(null); //내이름,방이름,방인언
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoardData = async () => {
      try{
        const roomCode = sessionStorage.getItem("currentRoomCode");
        const token = localStorage.getItem('idToken');

        const [infoRes, rulesRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_HOST_URL}/rooms/${roomCode}/info`, {
            withCredentials: true
          }),
          axios.get(`${process.env.REACT_APP_HOST_URL}/rooms/${roomCode}/rules`, {
            withCredentials: true
          })
        ]);

        setRoomInfo(infoRes.data);
        setRules(rulesRes.data);

      } catch (error) {
        console.error("보드 데이터 로딩 실패:", error);
      } finally{
        setLoading(false);
      }
    };

    fetchBoardData();
  }, []);

  if (loading) return <div>로딩 중..</div>;

  return(
    <PageContainer>
      <TopArea>
        <BoardTopSection
          userName={roomInfo?.nickname}
          roomName={roomInfo?.roomName}
          memberCount={roomInfo?.maxPeople}
          rules={rules}
        />
      </TopArea>

      <BottomArea>
        <BoardOpinionSection />
      </BottomArea>
    </PageContainer>
  );
};

export default BoardPage;

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${Colors.white};
    display: flex;

    padding-top: 43px;
    padding-bottom: 269px;

    position: relative;
    box-sizing: border-box;
`;