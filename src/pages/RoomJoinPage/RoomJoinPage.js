import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import TitleSection from "../../components/common/TitleSection";
import GoBackPage from "../../components/common/BackButton";
import TitleIcon from "../../assets/Ellipse 5.svg";

const RoomJoinPage = () => {
    const navigate = useNavigate();
    return(
        <PageContainer>
            <GoBackPage/>
            <TitleSection
                iconSrc={TitleIcon}
                titleText={"방 들어가기"}
                subTitleText={"우리 방에 들어가요"}
            />
        </PageContainer>
    )
}

export default RoomJoinPage;

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