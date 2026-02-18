/* eslint-disable */

import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import NoIconTitleSection from "../../components/common/NoIconTitleSection";
import GoBackPage from "../../components/common/BackButton";
import ArrowBtnIcon from "../../assets/arrowbtnIcon.svg";
import axios from "axios";
import OpenDoorIcon from "../../assets/opendoorIcon.svg";
import HomeIcon from "../../assets/homeIcon.svg";

const RoomStartPage = () => {
    const navigate = useNavigate();

    const [roomCode, setRoomCode] = useState("");
    const [isError, setIsError] = useState(false);

    const handleRoomCreate = () => {
        navigate("/room/create");
    };

    const handleRoomJoin = async() => {
        if(!isButtonActive) return;

        try{
            const token = localStorage.getItem("idToken");

            const response = await axios.get(`${process.env.REACT_APP_HOST_URL}/rooms/check`, {
                params: {
                    roomCode: roomCode
                },
                withCredentials: true
            });

            if(response.status === 200) {
                console.log("검증 성공. 방에 들어가자");
                setIsError(false);

                navigate("/room/join", {
                    state: {code: roomCode}
                });
            }
        } catch(error) {
            console.error("검증실패:", error);
            const status = error.response?.status;

            if(status === 404) {
                alert("존재하지 않는 방 코드입니다. 다시 확인해 주세요");
            } else if (status === 409){
                alert("방 인원이 가득 찼습니다. 다른 방을 이용해 주세요");
            } else if(status === 500) {
                alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요");
            } else {
                alert("알 수 없는 오류가 발생했습니다");
            }

            setIsError(true);
        }
    };

    const handleRoomCodeChange = (e) => {
        const text = e.target.value;

        if (text.length <= 6){
            setRoomCode(text);
            setIsError(false);
        }
    };

    const isButtonActive = roomCode.length === 6;

    return(
        <PageContainer>
            <GoBackPage/>
            <NoIconTitleSection
                titleText={"우리 방 시작하기"}
                subTitleText={"룸메이트와 함께 사용할 방을 만들어보세요"}
            />

            <CardContainer>
                <CreateCard onClick={handleRoomCreate}>
                    <TitleIcon src={HomeIcon} alt=""/>
                    <CardTitle style={{color:Colors.white}}>방 만들기</CardTitle>
                    <CardSubText>* 방 생성 후에는 이 권한을 변경할 수 없어요</CardSubText>
                </CreateCard>

                <JoinCard>
                    <TitleIcon src={OpenDoorIcon} alt=""/>
                    <CardTitle style={{ color: Colors.black}}>방 들어가기</CardTitle>
                    <InputWrapper>
                        <CodeInput
                            placeholder = "코드를 입력해주세요"
                            value={roomCode}
                            onChange={handleRoomCodeChange}
                            maxLength={6}
                            $isError={isError}
                        />
                        
                        <ArrowButton onClick={handleRoomJoin} disabled={!isButtonActive}
                        $isError={isError}>
                            <img src={ArrowBtnIcon} alt=""/>
                        </ArrowButton>

                        {isError && ( <ErrorContainer>
                            <IconImage src={InfoIconImg} alt=""/>
                            <ErrorMessage>잘못된 코드입니다</ErrorMessage>
                        </ErrorContainer> )}

                    </InputWrapper>

                </JoinCard>
            </CardContainer>
        </PageContainer>
    );
};

export default RoomStartPage;

//styled-components
const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${Colors.backgroundColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    //padding-top: 43px;
    padding-bottom: 429px;
    position: relative;
    box-sizing: border-box;
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    width: 100%;
    max-width: 937px;
    margin-top: 0;

    @media (max-width: 950px){
        flex-direction: column;
        align-items: center;
        width: 90%;
    }
`;

const CardBase = styled.div`
    display: flex;
    width: 461px;
    height: 329px;
    box-sizing: border-box;
    padding: 0;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 65px;
    align-items: center;
    box-shadow: 0px 0px 15px ${Colors.boxShadowBlack};
    border-radius: 15px;
    transition: transform 0.2s;

    @media (max-width: 950px) {
        width: 100%;
        height: 250px;
        padding-top: 20px;
    }
`;

const CreateCard = styled(CardBase)`
    background: ${Colors.mainPurple};
    cursor: pointer;

    &:hover{
        background: ${Colors.hoverPurple};
    }
`;

const JoinCard = styled(CardBase)`
    background: ${Colors.white};
`;

const TitleIcon = styled.img`
    height: 110px;
    width: auto;
    margin-bottom: 16px;
`;

const CardTitle = styled.p`
    font-family: "Noto Sans KR";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin: 0;
`;

const CardSubText = styled.p`
    font-family: "Noto Sans KR";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    color: ${Colors.detailWhite};
    line-height: 27px;
    margin-top: 1px;
    margin-bottom: 0;
    white-space: nowrap;
`;

const InputWrapper = styled.div`
    position: relative;
    width: 270px;
    height: 57px;
    margin-top: 8px;

    display: flex;
    align-items: center;
`;

const CodeInput = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 11px;
    border: 1px solid ${props => props.$isError ? Colors.errorColor : Colors.borderLine};
    background: ${Colors.white};
    padding: 11px 102px 11px 15px;
    font-family: "Noto Sans KR";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 4px;
    outline: none; 
    box-sizing: border-box;

    &:focus{
        border: 2px solid ${props => props.$isError ? Colors.errorColor : Colors.mainPurple};
    }

    &:hover{
        border: 2px solid ${props => props.$isError ? Colors.errorColor : Colors.mainPurple};
    }

    &::placeholder {
        color: ${Colors.inputColor};
        font-family: "Noto Sans KR";
        font-size: 16px;
        font-weight: 500;
        line-height: 30px;
        letter-spacing: 0px;
    }
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    display: flex;
    width: 38px;
    height: 35px;
    padding: 17px 11px;
    justify-content: center;
    align-items: center;    
    border-radius: 11px;
    border: none;
    background: ${props => props.$isError ? "#ADADAD" : Colors.mainPurple};
    opacity: ${props => props.$isError ? 0.5 : 1};
    transition: background 0.3s ease;
    cursor: pointer;
    z-index: 10;
    
    &:disabled {
        background: ${Colors.mainPurple};
        opacity: 0.5;
        cursor: default;
    }

    & > svg {
        pointer-events: none;
    }

    &:hover{
        background: ${Colors.hoverPurple};
    }
`;

const IconImage = styled.img`
    width: 15px;
    height: 15px;
`;

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 6px;
`;

const ErrorMessage = styled.span`
    color: ${Colors.errorColor};
    font-family: "Noto Sans KR";
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

