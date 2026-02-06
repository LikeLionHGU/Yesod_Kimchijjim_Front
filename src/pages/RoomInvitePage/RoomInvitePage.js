import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import TitleSection from "../../components/common/TitleSection";
import GoBackPage from "../../components/common/BackButton";
import TitleIcon from "../../assets/Ellipse 5.svg";
import CheckIcon from "../../assets/check.svg";

/*방장이 RoomCreatePage이후 들어옴*/
/* 백엔드에서 방코드를 받아와서 띄워야 함 */

const RoomInvitePage = () => {
    const navigate = useNavigate();

    const handleWaitMember = () => {
        navigate("/room/leader/wait");
    };

    return(
        <PageContainer>
            <GoBackPage/>
            <TitleSection
                iconSrc={TitleIcon}
                titleText={"방이 생성되었습니다"}
                subTitleText={"룸메이트에게 초대 코드를 공유하세요"}
            />
            <CardContainer>
                <InfoCard>

                </InfoCard>

                <CodeCard>

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
    padding: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: ${Colors.boxShadowPurple};
    background: ${Colors.white};
    border-radius: 15px;
    transition: transform 0.2s;

    @media (max-width: 950px) {
        width: 100%;
        height: 250px;
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
    box-shadow: ${Colors.boxShadowPurple};
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