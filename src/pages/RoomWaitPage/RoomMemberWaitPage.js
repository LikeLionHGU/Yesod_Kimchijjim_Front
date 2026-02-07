import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation} from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import GoBackPage from "../../components/common/BackButton";

const RoomMemberWaitPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const roomCode = location.state?.code || "??????";

    /*const handleTestStart = () => {
        navigate("/room/test")
    };*/

    return (
        <PageContainer>
            <GoBackPage />
            <TitleGroup>
                <Title>대기실</Title>
                <SubTitle>모든 룸메이트가 입장하길 기다리고 있어요</SubTitle>
            </TitleGroup>
            <Card>
                <CodeGroup>
                    <Label>방 코드</Label>
                    <Code>{roomCode}</Code>
                </CodeGroup>
            </Card>
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

const Card = styled.div`
    border-radius: 15px;
    background: ${Colors.white};
    box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple}; 
    width: 556px;
    height: 86px;
    box-sizing: border-box;
    padding: 13px 0;
    gap: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: 186px;
`;

const CodeGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    position: relative;
    align-items: center;
`;

const Label = styled.label`
    margin: 0;
    display: block;
    font-weight: 700;
    line-height: 15px;
    font-family: ${Colors.font};
    font-size: 15px;
    font-style: normal;
    color: ${Colors.detailBlack};
`;

const Code = styled.div`
    color: ${Colors.black};
    text-align: center;
    font-family: ${Colors.font};
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 5.4px;
`;