import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import BoardTopSection from "./BoardTopSection";
import BoardOpinionSection from "./BoardOpinionSection";

const BoardPage = () => {
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = useState(null); //내이름,방이름,방인언
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const roomCode = sessionStorage.getItem("currentRoomCode");
  const token = localStorage.getItem("idToken");

  // 방 데이터 불러오기 get
  const fetchBoardData = async () => {

    if (!roomCode) {
      alert("방 정보를 찾을 수 없습니다");
      navigate("/");
      return;
    }

    try{
      const [infoRes, rulesRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_HOST_URL}/rooms/${roomCode}/info`, { withCredentials: true }),
        axios.get(`${process.env.REACT_APP_HOST_URL}/room/${roomCode}/test/summary`, { withCredentials: true })
      ]);

      console.log("방 정보:", infoRes.data);
      console.log("규칙 정보:", rulesRes.data);

      setRoomInfo( infoRes.data );
      setRules( rulesRes.data );

      } catch (error) {
        console.error("보드 데이터 로딩 실패:", error);
      } finally{
        setLoading(false);
      }
    };

    useEffect(()=>{
      fetchBoardData();
    }, []);

    //방 이름 수정하기 (Put)
    const handleUpdateRoomName = async(newName) => {
      try{
        if(!roomInfo) {
          alert("방 정보를 불러오는 중입니다");
          return;
        }

        console.log("이름 수정 요청", newName);

        const roomCode = sessionStorage.getItem("currentRoomCode");

        await axios.put(`${process.env.REACT_APP_HOST_URL}/rooms/${roomCode}`, 
          {roomName: newName,
            maxPeople: roomInfo.maxPeople,
            hostNickname: roomInfo.hostNickname
          },
          {withCredentials: true}
        );
        alert("방 이름이 수정되었습니다");
        fetchBoardData();
      } catch(error) {
        console.error("방 수정 실패:", error);
        alert("수정에 실패했습니다");
      }
    };

    //방 삭제(DELETE)
    const handleDeleteRoom = async() => {
      try{
        console.log("방 삭제 요청 보냄");

        const roomCode = sessionStorage.getItem("currentRoomCode");

        await axios.delete(`${process.env.REACT_APP_HOST_URL}/rooms/${roomCode}`, {withCredentials: true});

        alert("방이 삭제되었습니다");
        sessionStorage.removeItem("currentRoomCode");
        navigate("/");

      } catch(error) {
        console.error("방 삭제 실패:", error);
        alert("삭제에 실패했습니다");
      }
    };

    if (loading) return <div>로딩 중..</div>;

  return(
    <PageContainer>
      <TopArea>
        <BoardTopSection
          userName={roomInfo?.nickname} //백엔드확인
          roomName={roomInfo?.roomName} //백엔드확인
          memberCount={roomInfo?.maxPeople} //백엔드확인
          rules={rules}
          onUpdateRoom={handleUpdateRoomName}
          onDeleteRoom={handleDeleteRoom}
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


const TopArea = styled.div`
  width: 100%;
`;

const BottomArea = styled.div`
  width: 100%;
`;
