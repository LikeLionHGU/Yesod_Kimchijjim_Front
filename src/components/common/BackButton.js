import React from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import  { useNavigate } from "react-router-dom";


const BackButtonStyle = styled.button`
    position: absolute;
    top: 90px;
    left: calc(50% - 468px - 56px - 39px); 
    @media (max-width:1000px){
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
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M9.41406 1.41406L2.82812 8L9.41406 14.5859L8 16L0 8L8 0L9.41406 1.41406Z" fill="#A2A2A2" />
            </svg>
        </BackButtonStyle>
    )
};

export default GoBackPage;