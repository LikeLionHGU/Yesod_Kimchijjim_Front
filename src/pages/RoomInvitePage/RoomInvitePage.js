import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Colors } from "../../styles/colors";
import TitleSection from "../../components/common/TitleSection";
import GoBackPage from "../../components/common/BackButton";
import LinkIcon from "../../assets/linkIcon.svg";
import HomeIcon from "../../assets/homeIcon.svg";

/*방장이 RoomCreatePage이후 들어옴*/
/* 백엔드에서 방코드를 받아와서 띄워야 함 */

const RoomInvitePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {roomName, roomCode, member} = location.state || {
        roomName: "정보 없음",
        roomCode: "ERROR",
        member: 0
    };

    const handleWaitMember = () => {
        navigate("/room/leader/wait", {
            state: {roomCode: roomCode}
        });
    };

    const handleCopyCode = async () => {
        try{
            await navigator.clipboard.writeText(roomCode);
            alert("초대 코드가 복사되었습니다!");
        } catch(err) {
            alert("복사 실패");
        }
    }

    return(
        <PageContainer>
            <GoBackPage/>
            <TitleSection
                iconSrc={HomeIcon}
                titleText={"방이 생성되었습니다"}
                subTitleText={"룸메이트에게 초대 코드를 공유하세요"}
            />
            <CardContainer>
                <InfoCard>
                    <InfoGroup style={{marginBottom: `48px`}}>
                        <Label>방 이름</Label>
                        <NameInfo>{roomName}</NameInfo>
                    </InfoGroup>
                    <InfoGroup>
                        <Label>최대 인원</Label>
                        <MemeberInfo>{member}명</MemeberInfo>
                    </InfoGroup>
                </InfoCard>

                <CodeCard>
                    <InfoGroup>
                        <Label>방 코드</Label>
                        <CodeInfo><span>{roomCode}</span>
                            <LinkIconWrapper onClick={handleCopyCode}>
                                <img src={LinkIcon} />
                            </LinkIconWrapper></CodeInfo>
                    </InfoGroup>
                </CodeCard>
            </CardContainer>
            <CreateButtonWrapper>
                <CreateButton
                    onClick={handleWaitMember}>대기실 입장하기</CreateButton>
            </CreateButtonWrapper>
        </PageContainer>
    );

};

export default RoomInvitePage;

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
    max-width: 936px;
    margin-top: 0;

    @media (max-width: 950px){
        flex-direction: column;
        align-items: center;
        width: 90%;
    }
`;

const InfoCard = styled.div`
    display: flex;
    width: 365px;
    height: 329px;
    box-sizing: border-box;

    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 95px;
    box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
    background: ${Colors.white};
    border-radius: 15px;
    transition: transform 0.2s;

    @media (max-width: 950px) {
        width: 100%;
        height: 200px;
        flex-direction: row;
        padding: 60px 20px;
        justify-content: center;
        align-items: flex-start;
        gap: 15px; 
    }
`;

const CodeCard = styled.div`
    display: flex;
    width: 556px;
    height: 329px;
    box-sizing: border-box;
    padding: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
    background: ${Colors.white};
    border-radius: 15px;
    transition: transform 0.2s;

    @media (max-width: 950px) {
        width: 100%;
        height: 250px;
    }
`;

const CreateButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 936px;
    justify-content: flex-end;
    margin-top: 20px;

    @media(max-width: 950px){
        width: 90%;
    }
`;

const CreateButton = styled.div`
    display: flex;
    width: 175px;
    height: 55px;
    padding: 12px 62px;
    justify-content: center;
    align-items: center;
    gap: 10px;   

    border-radius: 11px;
    background: ${Colors.mainPurple};
    border: none;

    color: ${Colors.white};
    font-family: "Noto Sans KR";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    white-space: nowrap;
    box-sizing: border-box;

    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }
`;

const InfoGroup = styled.div`
    display: flex;
    flex-direction: column; 
    gap: 10px;
    align-items: flex-start;

    @media(max-width: 950px) {
        
    }
`;


const Label = styled.label`
    margin: 0;
    display: block;
    font-family: ${Colors.font};
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px;
    color: ${Colors.detailBlack};
`;

const NameInfo = styled.div`
    box-sizing: border-box;

    width: 175px;
    height: 55px;
    border-radius: 11px;
    background: ${Colors.fixWhite};
    border: none;
    padding: 20px 18px;

    font-family: ${Colors.font};
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px; 
    color: ${Colors.borderLine};
`;

const MemeberInfo = styled.div`
    box-sizing: border-box;

    width: 80px;
    height: 55px;
    border-radius: 11px;
    background: ${Colors.fixWhite};
    border: none;
    padding: 20px 28px;

    font-family: ${Colors.font};
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px; 
    color: ${Colors.borderLine};
`;

const CodeInfo = styled.div`
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 366px;
    height: 74px;
    border-radius: 11px;
    background: ${Colors.fixWhite};
    border: none;
    padding: 18px 28px;

    font-family: ${Colors.font};
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    color: ${Colors.black};
    letter-spacing: 5px;
`;

const LinkIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
`;