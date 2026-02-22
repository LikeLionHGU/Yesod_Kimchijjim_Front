import {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import BoardIcon from "../../assets/boardpageIcon.svg";
import peopleICon from "../../assets/peopleIcon.svg";
import purplepencilIcon from "../../assets/purplepencilIcon.svg";
import rightPassPageIcon from "../../assets/rightPassPage.svg";
import leftPassPageIcon from "../../assets/leftPassPage.svg";
import EditRoomModal from "./EditRoomModal";

const BoardTopSection = ({userName, roomName, memberCount, rules, isLeader, onUpdateRoom, onDeleteRoom}) => {

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditmodal = () => setIsEditModalOpen(false);

  const handleRoomUpdate = (newName) => {
    onUpdateRoom(newName);
    console.log("방 이름 수정:", newName);
    //백엔드 연결 (방이름 업데이트 관련)
  };

  const handleRoomDelete = () => {
    onDeleteRoom();
    console.log("방 삭제 요청");
    //백엔드 연결 (방 삭제 관련)
  };

  const handleGoEditRule = () => {
    navigate("/test/result", {state:{isFromBoardEdit: true}});
  };

  //규칙들
  const totalPages = Math.ceil((rules?.length || 0) / ITEMS_PER_PAGE);

  const handleprevPage = () => {
    if (currentPage>0) {
      setCurrentPage(currentPage -1);
    }
  };

  const handleNextPage = () => {
    if(currentPage < totalPages - 1){
      setCurrentPage(currentPage + 1);
    }
  };

  const currentRules= rules?.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return(
    <TopContainer>
      <ContentWrapper>

        <LeftSection>
          <GreetingGroup>
            <Title>반가워요, <Name>{userName}</Name>님</Title>
            <SubTitle>우리방 규칙을 확인하고, 의견을 나눠보세요</SubTitle>
          </GreetingGroup>

          <BoardPageIcon src={BoardIcon} alt=""/>

        </LeftSection>

        <RightSection>
          <RuleCard>
            <CardHeader>우리방의 규칙</CardHeader>

            <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
              <SectionLabel>방 정보</SectionLabel>
              {isLeader && <IconButton src={purplepencilIcon} alt="" onClick={openEditModal} />}
            </div>

            <RoomInfoBox>
              <RoomName>{roomName}</RoomName>
              <MemberCountGroup>
                <UserIconImg src={peopleICon} alt=""/>
                <Count>{memberCount}</Count>
              </MemberCountGroup>
            </RoomInfoBox>

            <SectionTitleGroup>
              <SectionLabel>방 규칙</SectionLabel>
              {isLeader && <TextButton onClick={handleGoEditRule}>규칙 수정하기</TextButton>}
            </SectionTitleGroup>

            <RuleListContainer>
              <PassBtn onClick={handleprevPage}
                disabled={currentPage === 0}>
                <img src={leftPassPageIcon} alt="" />
                </PassBtn> 

              <RuleList>
                {currentRules && currentRules.length > 0 ? (
                  currentRules.map((rule, index) => (
                    <RuleItem key={rule.id || index} title = {rule.rule}>
                      <RuleText>{rule.rule}</RuleText>
                    </RuleItem>

                  ))
                ) : (<RuleItem>아직 정해진 규칙이 없어요</RuleItem>)}
              </RuleList>

              <PassBtn onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}>
                <img src={rightPassPageIcon} alt="" />
                </PassBtn>

            </RuleListContainer>
            
            <DotContainer>
              {Array.from({length: totalPages}).map((_,i) => (
                <PageNationDot
                  key={i}
                  $active={i === currentPage}
                  onClick={() => setCurrentPage(i)}
                />
              ))}
            </DotContainer>

          </RuleCard>
        </RightSection>
      </ContentWrapper>

      {isEditModalOpen && (
        <EditRoomModal
          isOpen={isEditModalOpen}
          onClose={closeEditmodal}
          currentRoomName={roomName}
          onSave={handleRoomUpdate}
          onDelete={handleRoomDelete} />)}
          
    </TopContainer>
  )
}
export default BoardTopSection;

//styled-components

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  box-sizing: border-box;

  @media(max-width: 950px){
    padding-top: 60px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 60px;
  }
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
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 144px;

  @media(max-width: 950px){
    align-items: center;
    gap: 40px;
    width: 100%;
  }
`;

const GreetingGroup = styled.div`
  text-align: left;
  margin-bottom: 0;
  

`;

const Title = styled.p`
  color: ${Colors.black};
  font-family: ${Colors.font};
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 46px;
  margin: 0;

  @media(max-width: 768px){
    font-size: 24px;
    line-height: 34px;
  }
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
  margin-bottom: 0;

  @media(max-width: 768px){
    font-size: 17px;
    line-height: 30px;
  }
`;

const BoardPageIcon = styled.img`
  width: 332px;
  height: 328px;
  align-self: center;

  @media(max-width: 768px){
    width: 220px;
    height: auto;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media(max-width: 950px){
    width: 100%;
    justify-content: center;
  }
`;

const RuleCard = styled.div`
  //width: 460px;
  //height: 636px;
  width: 100%; //추가
  max-width: 460px; //추가
  height: auto; //추가
  min-height: 636px; //추가

  background: ${Colors.backgroundColor};
  border-radius: 15px;
  box-sizing: border-box;
  padding: 16px 41px;
  box-shadow: ${Colors.boxShadowBlack};
  display: flex;
  flex-direction: column;


  @media(max-width: 768px){
    padding: 20px 25px;
    min-height: 550px;
  }
`;

const CardHeader = styled.p`
  color: ${Colors.detailBlack};
  font-family: ${Colors.font};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px; 
  margin-bottom: 50px;
  margin-top: 26px;

  @media(max-width: 768px){
    margin-bottom: 30px;
    margin-top: 10px;
  }
`;

const SectionTitleGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionLabel = styled.p`
  font-size: 13px;
  font-family: ${Colors.font};
  color: ${Colors.detailBlack};
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
  margin: 0;
`;

const RoomInfoBox = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.white};
  padding: 14px 15px;
  border-radius: 12.592px;
  margin-top: 15px; 
  margin-bottom: 31px;
`; 

const RoomName = styled.span`
  color: ${Colors.black};
  font-family: ${Colors.font};
  font-size: 19px;
  font-style: normal;
  font-weight: 500;
  line-height: 21.405px;
`;

const MemberCountGroup = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.inputColor};
  gap: 5px;
`;

const RuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  min-height: 314px;
  //width: 360px;
  width: 100%;
  flex: 1;
  //margin: 0 10px;
  margin: 0;
`; 

const RuleItem = styled.div`
  background-color: ${Colors.white};
  display: flex;
  align-items: center;

  width: 100%;
  height: 54px;
  min-height: 54px;
  max-height: 54px;

  padding: 0 15px;
  border-radius: 12.591px;
  box-sizing: border-box;
`;

const RuleText = styled.div`
  color: ${Colors.black};
  font-family: ${Colors.font};
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  width: 100%;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄까지만 허용 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word; 
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;

  @media(max-width: 768px){
    font-size: 15px;
  }
`;

const TextButton = styled.button`
  background: none; 
  border: none;
  color: ${Colors.secondPurple};
  font-family: ${Colors.font};
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
  cursor: pointer;
`;

const IconButton = styled.img`
  width: 20px;
  cursor: pointer;
`;

const UserIconImg = styled.img`
  width: 17px;
  height: auto;
`;

const Count = styled.span`
  font-size: 18.887px;
  font-family: ${Colors.font};
`;

const PageNationDot = styled.div`
    width: 8px;
    height: 8px;
    background-color: ${props => props.$active ? Colors.secondPurple : Colors.inputColor};
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: center;
    margin-top: 17px;
`;

const DotContainer = styled.div`
  display: flex;
  gap: 7px;
  justify-content: center;
  margin-top: auto;
`;

const PassBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &:first-child {
    left: -20px; 
  }
  &:last-child {
    right: -20px;
  }

  @media(max-width: 768px){
    &:first-child {
    left: -15px; 
    }
    &:last-child {
    right: -15px;
    }
  }

  &:disabled{
    opacity: 0.3;
    cursor: default;
  }

  img{
    width: 8px;
    height: 13px;
    display: block;
  }
`;

const RuleListContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
`; 

