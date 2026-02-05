import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import TitleSection from "../../components/common/TitleSection";
import GoBackPage from "../../components/common/BackButton";
import titleIcon from "../../assets/Ellipse 5.svg";

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
`;

const CardContainer = styled.div`
    display: flex;
    gap: 15px;
    width: 100%;
    max-width: 
`

const RoomStartPage = () => {

}