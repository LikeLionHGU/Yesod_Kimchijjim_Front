
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import GoBackPage from "../../components/common/BackButton";
import axios from "axios";
import DoorIcon from "../../assets/doorIcon.svg";
import { useRoom } from "../../context/RoomContext";


const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding-top: 43px;
  padding-bottom: 236px;
  position: relative;
`;

const TitleGroup = styled.div`
    text-align: center;
    margin-bottom: 50px;
`;

const TitleIcon = styled.div`
    margin-top: 47px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;

    img{
      width: 69px;
      height: auto;
    }
`;

const Title = styled.p`
    color: ${Colors.black};
    text-align: center;
    font-family: ${Colors.font};
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 7px;
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

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 111px;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 0;

  @media (max-width: 950px) {
    flex-direction: column;
    gap: 48px;
    align-items: center;
    width: 100%;
  }
`;

const Card = styled.div`
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
  width: 936px;
  box-sizing: border-box;
  padding: 49px 95px 72px 95px;

  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: 950px) {
    width: 90%;
    height: auto;
    padding: 49px 95px 72px 95px;
    align-items: center;
  }

  @media (max-width: 768px) {
    padding: 30px 20px 40px 20px; 
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  width: 365px;

  @media (max-width: 950px) {
    width: 100%;
  }
`;

const Label = styled.label`
  margin: 0;
  display: block;
  font-weight: 700;
  font-size: 15px;
  font-family: ${Colors.font};
  font-style: normal;
  color: ${Colors.detailBlack};
`;

const Input = styled.input`
  box-sizing: border-box;

  width: 365px;
  height: 55px;
  border-radius: 11px;
  border: solid
    ${(props) =>
      props.$hasError ? `2px ${Colors.errorColor}` : `2px ${Colors.inputColor}`};
  background: ${Colors.white};
  font-size: 15px;
  outline: none;
  padding: 20px 28px;

  &:focus {
    border: 2px solid
      ${(props) => (props.$hasError ? `${Colors.errorColor}` : `${Colors.mainPurple}`)};
  }

  &:hover{
    border: 2px solid ${props => props.$isError ? Colors.errorColor : Colors.mainPurple};
  }

  @media (max-width: 950px) {
    width: 100%;
  }
`;

const IconImage = styled.img`
  width: 15px;
  height: 15px;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: ${Colors.errorColor};
  font-family: "Noto Sans KR";
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const MemberContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const MemberButton = styled.button`
  box-sizing: border-box;
  display: flex;
  width: 80px;
  height: 55px;
  padding: 20px 28px;
  white-space: nowrap;

  justify-content: center;
  align-items: center;

  border-radius: 11px;
  border: solid
    ${(props) =>
      props.$isSelected ? `2px ${Colors.mainPurple}` : `2px ${Colors.inputColor}`};
  background: ${Colors.white};

  color: ${(props) => (props.$isSelected ? `${Colors.mainPurple}` : `${Colors.inputColor}`)};
  font-family: "Noto Sans KR";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;

  &:hover {
    border: solid ${Colors.mainPurple} 2px;
    color: ${Colors.mainPurple};
    opacity: ${(props) => (props.$isSelected ? `1` : `0.7`)};
    cursor: pointer;
  }
`;

const CreateButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 936px;
  justify-content: flex-end;
  margin-top: 20px;

  @media (max-width: 950px) {
    width: 90%;
  }
`;

const CreateButton = styled.button`
  display: flex;
  width: 175px;
  height: 55px;
  padding: 12px 62px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 11px;
  opacity: ${(props) => (props.$isActive ? 1 : 0.3)};
  background: ${Colors.mainPurple};
  border: none;

  color: ${Colors.white};
  font-family: "Noto Sans KR";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;

  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};

  &:hover:not(:disabled) {
    background: ${Colors.hoverPurple};
  }
`;

const RoomCreatePage = () => {
  const navigate = useNavigate();

  // RoomContext로 통일
  const { setRoomCode, setAmIHost, setUserId } = useRoom();

  const [myName, setMyname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [member, setMember] = useState(null);

  const [isNameError, setIsNameError] = useState(false);
  const [isRoomError, setIsRoomError] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setMyname(value);

    const regex = /^[가-힣a-zA-Z]+$/;

    if (value.length === 0) {
      setIsNameError(false);
      return;
    }

    if (value.length < 2 || value.length > 10 || !regex.test(value)) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }
  };

  const handleRoomChange = (e) => {
    const value = e.target.value;
    setRoomName(value);

    if (value.length === 0) {
      setIsRoomError(false);
      return;
    }

    if (value.length < 2 || value.length > 10) {
      setIsRoomError(true);
    } else {
      setIsRoomError(false);
    }
  };

  const isActive =
    !isNameError &&
    myName.length >= 2 &&
    !isRoomError &&
    roomName.length >= 2 &&
    member !== null;

  const handleCreate = async () => {
    if (!isActive) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_URL}/rooms`,
        {
          roomName: roomName,
          maxPeople: member,
          hostNickname: myName,
        },
        { withCredentials: true }
      );

      console.log("백엔드 응답:", response.data);

      const { roomName: backendRoomName, roomCode, maxPeople, userId } = response.data;

      // Context 세팅 (ResultPage가 이걸 보고 host 분기함)
      setRoomCode(roomCode);
      setAmIHost(true);

      // 혹시 백엔드가 userId도 주면 저장 (안주면 null이어도 OK)
      if (userId !== null && userId !== undefined) setUserId(Number(userId));

      
      sessionStorage.setItem("roomName", backendRoomName);
      sessionStorage.setItem("maxPeople", String(maxPeople));

      navigate("/room/invite", {
        state: {
          roomName: backendRoomName,
          roomCode,
          member: maxPeople,
          isLeader: true,
        },
      });
    } catch (error) {
      console.error("방 생성 실패:", error);
      alert("방 생성 중 오류 발생");
    }
  };

  return (
    <PageContainer>
      <GoBackPage />
      <TitleGroup>
        <TitleIcon>
          <img src={DoorIcon} alt=""/>
        </TitleIcon>
        <Title>방 만들기</Title>
        <SubTitle>룸메이트와 함께 사용할 방을 만들어보세요</SubTitle>
      </TitleGroup>

      <Card>
        {/*내 이름*/}
        <FormGroup style={{ marginBottom: `48px` }}>
          <Label>내 이름</Label>
          <Input type="text" value={myName} onChange={handleNameChange} $hasError={isNameError} />

          {isNameError && (
            <ErrorContainer>
              <IconImage src={InfoIconImg} alt=""/>
              <ErrorMessage>한국어·영문만 사용 가능하며, 이름은 2~10자로 입력해주세요</ErrorMessage>
            </ErrorContainer>
          )}
        </FormGroup>

        <RowWrapper>
          {/* 방 이름 입력 */}
          <FormGroup>
            <Label>방 이름</Label>
            <Input type="text" value={roomName} onChange={handleRoomChange} $hasError={isRoomError} />
            {isRoomError && (
              <ErrorContainer>
                <IconImage src={InfoIconImg} />
                <ErrorMessage>방 이름은 2~10자로 입력해주세요</ErrorMessage>
              </ErrorContainer>
            )}
          </FormGroup>

          <FormGroup>
            <Label>방 인원</Label>
            <MemberContainer>
              {[2, 3, 4].map((num) => (
                <MemberButton key={num} type="button" $isSelected={member === num} onClick={() => setMember(num)}>
                  {num}명
                </MemberButton>
              ))}
            </MemberContainer>
          </FormGroup>
        </RowWrapper>
      </Card>

      <CreateButtonWrapper>
        <CreateButton $isActive={isActive} disabled={!isActive} onClick={handleCreate}>
          만들기
        </CreateButton>
      </CreateButtonWrapper>
    </PageContainer>
  );
};

export default RoomCreatePage;
