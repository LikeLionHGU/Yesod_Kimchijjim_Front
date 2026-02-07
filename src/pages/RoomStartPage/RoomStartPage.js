import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import TitleSection from "../../components/common/TitleSection";
import GoBackPage from "../../components/common/BackButton";
import TitleIcon from "../../assets/Ellipse 5.svg";
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
            <TitleSection
                iconSrc={TitleIcon}
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
                        />
                        <ArrowButton onClick={handleRoomJoin} disabled={!isButtonActive}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                                <path d="M1 6.36426C0.447715 6.36426 -6.43764e-08 6.81197 0 7.36426C6.43764e-08 7.91654 0.447715 8.36426 1 8.36426L1 7.36426L1 6.36426ZM16.7071 8.07136C17.0976 7.68084 17.0976 7.04767 16.7071 6.65715L10.3431 0.293189C9.95262 -0.0973354 9.31946 -0.0973354 8.92893 0.293189C8.53841 0.683714 8.53841 1.31688 8.92893 1.7074L14.5858 7.36426L8.92893 13.0211C8.53841 13.4116 8.53841 14.0448 8.92893 14.4353C9.31946 14.8258 9.95262 14.8258 10.3431 14.4353L16.7071 8.07136ZM1 7.36426L1 8.36426L16 8.36426L16 7.36426L16 6.36426L1 6.36426L1 7.36426Z" fill="white" />
                            </svg>
                        </ArrowButton>
                    </InputWrapper>

                    {isError && <ErrorContainer>
                        <IconImage src={InfoIconImg} />
                        <ErrorMessage>잘못된 코드입니다</ErrorMessage>
                    </ErrorContainer>}

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
`;

const CodeInput = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 11px;
    border: 1px solid ${Colors.borderLine};
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
        border: 2px solid ${Colors.mainPurple};
    }

    &:hover{
        border: 2px solid ${Colors.mainPurple};
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
    background: ${Colors.mainPurple};
    opacity: 1;
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

