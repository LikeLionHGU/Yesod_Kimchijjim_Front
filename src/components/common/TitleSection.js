import styled from "styled-components";
import { Colors } from "../../styles/colors";

const TitleGroup = styled.div`
    text-align: center;
    margin-bottom: 64px;
`;

const TitleIcon = styled.div`
    margin-top: 133px;
    display: flex;
    justify-content: center;
    margin-bottom: 31px;
`;

const Title = styled.p`
    color: ${Colors.black};
    text-align: center;
    font-family: ${Colors.font};
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
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
                    {iconSrc && <img src={iconSrc}/>}
                </TitleIcon>
                <Title>{titleText}</Title>
                <Subtitle>{subTitleText}</Subtitle>
            </TitleGroup>
        );
    }
export default TitleSection;