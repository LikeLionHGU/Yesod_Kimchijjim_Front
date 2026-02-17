import React from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import  { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/backicon.svg";

const BackButtonStyle = styled.button`
    position: absolute;
    top: 29px;
    left: calc(50% - 468px - 56px - 39px); 
    @media (max-width:1200px){
        left:20px;
    }
    border-radius: 11px;
    background: ${Colors.white};
    box-shadow: 0 0 10px 0 ${Colors.boxShadowBlack};
    display: flex;
    width: 39px;
    height: 39px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    z-index: 10;

    &:hover{
        opacity: 0.5;
    }
`;

const GoBackPage = () => {
    
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return(
        <BackButtonStyle onClick={handleGoBack}>
            <img src={BackIcon} width="10" height="16"/>
        </BackButtonStyle>
    )
};

export default GoBackPage;