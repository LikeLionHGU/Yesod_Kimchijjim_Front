
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import  { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/backicon.svg";

const BackButtonStyle = styled.button`
    position: absolute;
    top: 29px;
    left: 157px; 

    @media (max-width:1024px){
        left:40px;
    }

    @media (max-width: 768px){
        left: 20px;
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
        <BackButtonStyle onClick={handleGoBack} aria-label="뒤로가기">
            <img src={BackIcon} width="10" height="16" alt="뒤로가기"/>
        </BackButtonStyle>
    )
};

export default GoBackPage;