import react, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import GoBackPage from "../../components/common/BackButton";
import sendAccessTokenToBackend from "../../api/sendAccessTokenToBackend";

const LoadingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <PageContainer>
            <GoBackPage />
            <TitleGroup>
                <Title>ZZZ</Title>
                <SubTitle>잠시만 기다려주세요..로그인중</SubTitle>
            </TitleGroup>
        </PageContainer>
    );
};

export default LoadingPage;

//styled-components
const PageContainer = styled.div`
    width: 100 %;
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