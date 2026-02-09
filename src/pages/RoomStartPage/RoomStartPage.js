import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import NoIconTitleSection from "../../components/common/NoIconTitleSection";
import GoBackPage from "../../components/common/BackButton";
import ArrowBtnIcon from "../../assets/arrowbtnIcon.svg";

const RoomStartPage = () => {
    const navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");

    const [isError, setIsError] = useState(false);

    const handleRoomCreate = () => {
        navigate("/room/create");
    };

    /*백엔드, 코드 맞으면 roomJoinPage로 넘어가기 
    const handleRoomJoin = async () => {
        if(roomCode.length !== 6) return;

        try{
            //백엔드 API 호출 (암호가 맞는지 확인)
            const response = await axios.post('/api/rooms/join', {code: roomCode});
        } catch (error) {
            setHasError(true);
        }
    };*/

    const handleRoomJoin = () => {
        if(roomCode === "123456"){
            console.log("성공");
            navigate("/room/join", {
                state: {code: roomCode}
            });
        } else{
            console.log("실패");
            setIsError(true);
        }
    }

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
                    <CardTitle style={{color:Colors.white}}>방 만들기</CardTitle>
                    <CardSubText>방을 처음 만든 사람이 방장이 돼요</CardSubText>
                </CreateCard>

                <JoinCard>
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
                            <img src={ArrowBtnIcon}/>
                        </ArrowButton>

                        {isError && ( <ErrorContainer>
                            <IconImage src={InfoIconImg} />
                            <ErrorMessage>잘못된 코드입니다</ErrorMessage>
                        </ErrorContainer>)}

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
    padding-top: 43px;
    padding-bottom: 269px;
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
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 15px ${Colors.boxShadowBlack};
    border-radius: 15px;
    transition: transform 0.2s;

    @media (max-width: 950px) {
        width: 100%;
        height: 250px;
    }
`;

const CreateCard = styled(CardBase)`
    background: ${Colors.mainPurple};
    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }
`;

const JoinCard = styled(CardBase)`
    background: ${Colors.white};
`;

const CardTitle = styled.p`
    font-family: "Noto Sans KR";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin:0;
`;

const CardSubText = styled.p`
    font-family: "Noto Sans KR";
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    color: ${Colors.detailWhite};
    line-height: 30px;
    margin-top: 3px;
    margin-bottom: 0;
    white-space: nowrap;
`;

const InputWrapper = styled.div`
    position: relative;
    width: 270px;
    height: 57px;
    margin-top: 18px;

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

