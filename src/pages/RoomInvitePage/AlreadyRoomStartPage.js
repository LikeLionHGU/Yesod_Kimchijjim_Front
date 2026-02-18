
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import TitleSection from "../../components/common/TitleSection";
import GoBackPage from "../../components/common/BackButton";
import HomeIcon from "../../assets/homeIcon.svg";
import { useNavigate } from "react-router-dom";
//import CheckVideo from "../../assets/checkVideo.gif";

const AlreadyRoomStartPage = () => {
    const navigate = useNavigate();

    return(
        <PageContainer>
            <GoBackPage/>
            <TitleSection
                iconSrc={HomeIcon}
                titleText={"이미 방이 시작되었어요"}
                subTitleText={"다시 기존 페이지로 돌아가세요"}
            />
        </PageContainer>
    );
};

export default AlreadyRoomStartPage;

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