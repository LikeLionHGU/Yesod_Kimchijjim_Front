import react, {useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import GoBackPage from "../../components/common/BackButton";

const RoomLeaderWaitPage = () => {
   const navigate = useNavigate();

   return(
    <PageContainer>
        <GoBackPage/>
    </PageContainer>
   );
};

export default RoomLeaderWaitPage;

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