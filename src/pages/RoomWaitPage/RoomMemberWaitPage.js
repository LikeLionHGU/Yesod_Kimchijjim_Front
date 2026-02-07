import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import GoBackPage from "../../components/common/BackButton";

const RoomMemberWaitPage = () => {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <GoBackPage />
            <TitleGroup>
                <Title>대기실</Title>
                <SubTitle>모든 룸메이트가 입장하길 기다리고 있어요</SubTitle>
            </TitleGroup>
        </PageContainer>
    );
};

export default RoomMemberWaitPage;

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

const TitleGroup = styled.div`
    text-align: center;
    margin-top: 164px;
`;

const Title = styled.p`
    color: ${Colors.detailBlack};
    text-align: center;
    font-family: ${Colors.font};
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
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

