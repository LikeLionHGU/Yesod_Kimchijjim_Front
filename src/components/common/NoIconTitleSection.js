import styled from "styled-components";
import { Colors } from "../../styles/colors";

const TitleGroup = styled.div`
    text-align: center;
    margin-bottom: 64px;
`;

const Title = styled.p`
    color: ${Colors.black};
    text-align: center;
    font-family: ${Colors.font};
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    margin-top: 126px;
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

function NoIconTitleSection({
    titleText,
    subTitleText
}) {
    return (
        <TitleGroup>
            <Title>{titleText}</Title>
            <SubTitle>{subTitleText}</SubTitle>
        </TitleGroup>
    );
}
export default NoIconTitleSection;