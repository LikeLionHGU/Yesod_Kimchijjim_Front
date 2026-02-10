import react from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import BoardIcon from "../../assets/boardpageIcon.svg";

function BoardTopSection = ({userName, roomName, memberCount, rules}) => {
  return(
    <TopContainer>
      <ContentWrapper>
        <LeftSection>
          <GreetingGroup>
            <Title>반가워요, <Name>{userName || "김한동"}</Name>님</Title>
            <SubTitle>우리방 규칙을 확인하고, 의견을 나눠보세요</SubTitle>
          </GreetingGroup>
          <BoardPageIcon src={BoardIcon}/>
        </LeftSection>

        <RightSection>
          <RuleCard>
            <CardHeader>우리방의 규칙</CardHeader>

            <SectionTitleGroup>
            </SectionTitleGroup>
          </RuleCard>
        </RightSection>
      </ContentWrapper>
    </TopContainer>
  )
}
export default BoardTopSection;

//styled-components

const TopContainer = styled.div`
  width: 100%;
  display: felx;
  justify-content: center;
  padding-top: 148px;
  background-color: ${Colors.white};
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px; 

  @media(max-width: 950px){
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 144px;
`;

const GreetingGroup = styled.div`
  text-align: left;
`;

const Title = styled.p`
  color: ${Colors.black};
  font-family: ${Colors.font};
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 46px;
  margin: 0;
`;

const Name = styled.span`
  color: ${Colors.mainPurple};
`;

const SubTitle = styled.p`
  color: ${Colors.black};
  font-family: ${Colors.font};
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 46px;
  margin-top: 0;
`