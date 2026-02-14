import react, {useState} from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import BoardIcon from "../../assets/boardpageIcon.svg";
import peopleICon from "../../assets/peopleIcon.svg";
import pencilIcon from "../../assets/Pencil.svg";
import passPage from "../../assets/passpage.svg";
import EditRoomModal from "./EditRoomModal";

const BoardTopSection = ({userName, roomName, memberCount, rules, onUpdateRoom, onDeleteRoom}) => {

  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 5;

  const isLeader = sessionStorage.getItem("isLeader") === "true";
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

          <BoardPageIcon src={BoardIcon}/>

        </LeftSection>

        <RightSection>
          <RuleCard>
            <CardHeader>우리방의 규칙</CardHeader>

            <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
              <SectionLabel>방 정보</SectionLabel>
              {isLeader && <IconButton src={pencilIcon} onClick={openEditModal} />}
            </div>

            <RoomInfoBox>
              <RoomName>{roomName}</RoomName>
              <MemberCountGroup>
                <UserIconImg src={peopleICon}/>
                <Count>{memberCount}</Count>
              </MemberCountGroup>
            </RoomInfoBox>

            <SectionTitleGroup>
              <SectionLabel>방 규칙</SectionLabel>
              {isLeader && <TextButton>규칙 수정하기</TextButton>}
            </SectionTitleGroup>

            <RuleListContainer>
              <PassBtn onClick={handleprevPage}
                $disabled={currentPage ===0}
                src = {passPage}/>

              <RuleList>
                {currentRules && currentRules.length > 0 ? (
                  currentRules.map((rule, index) => (
                    <RuleItem key={rule.id || index}>{rule.rule}</RuleItem>

                  ))
                ) : (<RuleItem>아직 정해진 규칙이 없어요</RuleItem>)}
              </RuleList>

              <PassBtn onClick={handleNextPage}
                $disabled={currentPage === totalPages - 1}
                src={passPage}/>

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
  padding-top: 148px;
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
`;

const BoardPageIcon = styled.img`
  width: 332px;
  height: 328px;
  align-self: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const RuleCard = styled.div`
  width: 460px;
  height: 636px;
  background: ${Colors.backgroundColor};
  border-radius: 15px;
  padding: 16px 41px;
  box-shadow: ${Colors.boxShadowBlack};
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.p`
  color: ${Colors.detailBlack};
  font-family: ${Colors.font};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 17px; 
  margin-bottom: 50px;
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
`;

const RoomInfoBox = styled.div`
  display: flex;
  max-width: 360px;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.white};
  padding: 14px 15px;
  border-radius: 12.592px;
  margin-top: 15px; 
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
`; 

const RuleItem = styled.div`
  background-color: ${Colors.white};
  display: flex;
  height: 54px;
  padding: 16px 15px;
  border-radius: 12.591px;
  color: ${Colors.black};

  font-family: ${Colors.font};
  font-size: 19px;
  font-style: normal;
  font-weight: 500;
  line-height: 21.405px;
  text-align: left;
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
    background-color: ${props => props.$active ? Colors.mainPurple : Colors.borderLine};
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: center;
    margin-top: 7px;
`;

const DotContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: auto;
  padding-bottom: 20px;
`;

const PassBtn = styled.button`
  background: none;
  border: none;
  width: 8px;
  height: 14px;
  cursor: pointer;
`;

const RuleListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`; 

