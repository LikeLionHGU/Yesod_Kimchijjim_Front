
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import BoardTopSection from "./BoardTopSection";
import BoardOpinionSection from "./BoardOpinionSection";

const BoardPage = () => {
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = useState(null);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLeader, setIsLeader] = useState(false);

  const roomCode = sessionStorage.getItem("currentRoomCode");
  const userId = sessionStorage.getItem("userId");

  const fetchBoardData = useCallback(async () => {
    if (!roomCode) {
      alert("방 정보를 찾을 수 없습니다");
      navigate("/");
      return;
    }

    try {
      const infoRes = await axios.get(
        `${process.env.REACT_APP_HOST_URL}/rooms/${roomCode}/info`,
        { withCredentials: true }
      );
      setRoomInfo(infoRes.data);
    } catch (error) {
      console.log("방 정보 로딩 실패:", error);
      
    }

    try {
      const rulesRes = await axios.get(
        `${process.env.REACT_APP_HOST_URL}/room/${roomCode}/test/summary`,
        {
          params: { userId: userId },
          withCredentials: true,
        }
      );

      setRules(rulesRes.data.data || []);
      setIsLeader(rulesRes.data.amIHost === true);
    } catch (error) {
      console.log("규칙 데이터 로딩 실패", error);
    } finally {
      setLoading(false);
    }
  }, [roomCode, userId, navigate]);

  useEffect(() => {
    fetchBoardData();
  }, [fetchBoardData]);

  const handleUpdateRoomName = async (newName) => {
    try {
      if (!roomInfo) {
        alert("방 정보를 불러오는 중입니다");
        return;
      }

      const currentRoomCode = sessionStorage.getItem("currentRoomCode");

      await axios.put(
        `${process.env.REACT_APP_HOST_URL}/rooms/${currentRoomCode}`,
        {
          roomName: newName,
          maxPeople: roomInfo.roomInfo.maxPeople,
          hostNickname: roomInfo.hostNickname,
        },
        { withCredentials: true }
      );

      alert("방 이름이 수정되었습니다");
      fetchBoardData();
    } catch (error) {
      console.error("방 수정 실패:", error);
      alert("수정에 실패했습니다");
    }
  };

  const handleDeleteRoom = async () => {
    try {
      const currentRoomCode = sessionStorage.getItem("currentRoomCode");

      await axios.delete(`${process.env.REACT_APP_HOST_URL}/rooms/${currentRoomCode}`, {
        withCredentials: true,
      });

      alert("방이 삭제되었습니다");
      sessionStorage.removeItem("currentRoomCode");
      navigate("/");
    } catch (error) {
      console.error("방 삭제 실패:", error);
      alert("삭제에 실패했습니다");
    }
  };

  if (loading) return <div>로딩 중..</div>;

  return (
    <PageContainer>
      <TopArea>
        <TopInner>
          <BoardTopSection
            userName={roomInfo?.nickname}
            roomName={roomInfo?.roomInfo?.roomName}
            memberCount={roomInfo?.roomInfo?.maxPeople}
            rules={rules}
            isLeader={isLeader}
            onUpdateRoom={handleUpdateRoomName}
            onDeleteRoom={handleDeleteRoom}
          />
        </TopInner>
      </TopArea>

      <BottomSection>
        <BottomInner>
          <BoardOpinionSection />
        </BottomInner>
      </BottomSection>
    </PageContainer>
  );
};

export default BoardPage;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${Colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: clamp(120px, 14vh, 269px);
  box-sizing: border-box;
`;

const TopArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TopInner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 0 16px;
  }
`;

const BottomSection = styled.section`
  width: 100%;
  background: ${Colors.fixWhite};
  padding: 56px 0 90px;

  @media (max-width: 900px) {
    padding: 36px 0 70px;
  }
`;

const BottomInner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 0 16px;
  }
`;