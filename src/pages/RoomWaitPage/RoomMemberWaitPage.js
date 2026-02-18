import {useState, useEffect} from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";

import GoBackPage from "../../components/common/BackButton";
import NoIconTitleSection from "../../components/common/NoIconTitleSection";
import axios from "axios";

const RoomLeaderWaitPage = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const roomCode = location.state?.roomCode|| sessionStorage.getItem("currentRoomCode") || "??????";

    const [roomStatus, setRoomStatus] = useState({
        isFull: false,
        currentPeople: 0,
        maxPeople: 0
    });

    useEffect(()=>{
        const checkStatus = async() => {
            try{
                
                
                const response = await axios.get(`${process.env.REACT_APP_HOST_URL}/rooms/${roomCode}/waiting`, {
                    withCredentials: true
                });

                const {isFull, currentPeople, maxPeople} = response.data;

                setRoomStatus({
                    isFull,
                    currentPeople,
                    maxPeople
                });

                if (isFull === true || currentPeople >= maxPeople || response.data.full === true) {
                    navigate("/room/test", {
                        state: {roomCode: roomCode}
                    });
                }
            } catch(error){
                console.error("방 상태를 불러오는 중 오류 발생:", error);
            }
        };

        const intervalId = setInterval(checkStatus, 3000);

        return () => clearInterval(intervalId);

    }, [roomCode, navigate]);

//    const handleTestStart = () => {
//     navigate("/room/test")
//    };

   return(
    <PageContainer>
        <GoBackPage/>
        <NoIconTitleSection
            titleText={"대기실"}
            subTitleText={"모든 룸메이트가 입장하길 기다리고 있어요"}
        />
        <Card>
            <CodeGroup>
                <Label>방 코드</Label>
                <Code>{roomCode}</Code>
            </CodeGroup>
        </Card>

        <ButtonGroup>
            {/* <TestStartBtn onClick={handleTestStart}>테스트 시작하기</TestStartBtn> */}

            {roomStatus.currentCount}/{roomStatus.maxCount}
        </ButtonGroup>
    </PageContainer>
   );
};

export default RoomLeaderWaitPage;

//styled-components
const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${Colors.backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 43px;
    padding-bottom: 269px;
    position: relative;
    box-sizing: border-box;
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
    margin-top: auto;
    margin-bottom: 19px;
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

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    margin-bottom: 186px;
`;
