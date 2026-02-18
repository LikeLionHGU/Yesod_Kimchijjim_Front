import styled from "styled-components";
import { Colors } from "../../styles/colors";

const TitleGroup = styled.div`
    text-align: center;
    margin-bottom: 64px;
`;

const TitleIcon = styled.div`
    margin-top: 73px;
    display: flex;
    justify-content: center;
    margin-bottom: 28px;
`;

const Title = styled.p`
    color: ${Colors.black};
    text-align: center;
    font-family: ${Colors.font};
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    margin-top: 0;
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

function TitleSection({
    iconSrc,
    titleText,
    subTitleText
    }) {
        return(
            <TitleGroup>
                <TitleIcon>
                    {iconSrc && <img src={iconSrc} alt=""/>}
                </TitleIcon>
                <Title>{titleText}</Title>
                <SubTitle>{subTitleText}</SubTitle>
            </TitleGroup>
        );
    }
export default TitleSection;