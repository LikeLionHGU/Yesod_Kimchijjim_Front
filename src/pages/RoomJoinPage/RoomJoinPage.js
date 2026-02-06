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

    const handleGoBack = () => {
        navigate(-1);
    };

    const [userName, setUserName] = useState("");
    const [isUserNameError, setIsUserNameError] = useState(false);

    const handleNameChange = (e) => {
        const value = e.target.values;
        setUserName(value);

        const regex = /^[가-힣a-zA-Z]+$/;

        if(value.length === 0) {
            setIsUserNameError(false);
            return;
        }

        if(value.length < 2 || value.length > 10 || !regex.test(value)) {
            setIsUserNameError(true);
        } else {
            setIsUserNameError(false);
        }
    };

    const isActive = 
        !isUserNameError && userName.length >= 2;


    return(
        <PageContainer>
            <GoBackPage/>
            <TitleSection
                iconSrc={TitleIcon}
                titleText={"방 들어가기"}
                subTitleText={"우리 방에 들어가요"}
            />
            <Card></Card>


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

const Card = styled.div`
    border-radius: 15px;
    background: ${Colors.white};
    box-shadow: 0 0 15px 0 rgba(163, 163, 253, 0.30);
    width: 555px;
    height: 192px;
    box-sizing: border-box;
    padding: 49px 95px;
    gap: 10px;
    display: flex;
    flex-direction: column;
`;