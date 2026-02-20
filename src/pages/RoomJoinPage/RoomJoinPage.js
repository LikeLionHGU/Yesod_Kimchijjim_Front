
import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import GoBackPage from "../../components/common/BackButton";
import OpenDoorIcon from "../../assets/opendoorIcon.svg";
import axios from "axios";
import { useRoom } from "../../context/RoomContext";

const RoomJoinPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const code = location.state?.code;

  // Context
  const { setRoomCode, setAmIHost, setUserId } = useRoom();

  const [userName, setUserName] = useState("");
  const [isUserNameError, setIsUserNameError] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);

    const regex = /^[가-힣a-zA-Z]+$/;

    if (value.length === 0) {
      setIsUserNameError(false);
      return;
    }

    if (value.length < 2 || value.length > 10 || !regex.test(value)) {
      setIsUserNameError(true);
    } else {
      setIsUserNameError(false);
    }
  };

  const isActive = !isUserNameError && userName.length >= 2;

  const handleWait = async () => {
    if (!isActive) return;
    if (!code) {
      alert("방 코드가 없어요. 다시 시도해 주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_HOST_URL}/rooms/join`,
        { roomCode: code, nickname: userName },
        { withCredentials: true }
      );

      const data = response.data;

      // 
      const joinedUserId =
        data?.userId ??
        data?.id ??
        data?.roomUserId ??
        data?.roomMemberId ??
        data?.memberId ??
        data?.user?.id ??
        null;

      // Context 세팅 (ResultPage 분기, summary 호출에 필요)
      setRoomCode(code);
      setAmIHost(false);

      if (joinedUserId !== null && joinedUserId !== undefined) {
        setUserId(Number(joinedUserId));
      } else {
        
        console.warn("[RoomJoinPage] userId not found in response:", data);
      }

      navigate("/room/wait", {
        state: {
          code,
          myNickname: userName,
          isLeader: false,
        },
      });
    } catch (error) {
      console.error("방 입장 실패:", error);
      alert(error.response?.data?.message || "방 입장에 실패했습니다");
    }
  };

  return (
    <PageContainer>
      <GoBackPage />
      <TitleGroup>
        <TitleIcon>
          <img src={OpenDoorIcon} alt=""/>
        </TitleIcon>
        <Title>방 들어가기</Title>
        <SubTitle>이름을 입력하면 방에 입장할 수 있어요</SubTitle>
      </TitleGroup>
  
      <Card>
        <FormGroup>
          <Label>내 이름</Label>
          <Input type="text" value={userName} onChange={handleNameChange} $hasError={isUserNameError} />

          {isUserNameError && (
            <ErrorContainer>
              <IconImage src={InfoIconImg} alt=""/>
              <ErrorMessage>한국어·영문만 사용 가능하며, 이름은 2~10자로 입력해주세요</ErrorMessage>
            </ErrorContainer>
          )}
        </FormGroup>
      </Card>

      <CreateButtonWrapper>
        <CreateButton $isActive={isActive} disabled={!isActive} onClick={handleWait}>
          대기실 입장하기
        </CreateButton>
      </CreateButtonWrapper>
    </PageContainer>
  );
};

export default RoomJoinPage;

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${Colors.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  //padding-top: 43px;
  //padding-bottom: 373px;
  position: relative;
  box-sizing: border-box;
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
      width: 68px;
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

const Card = styled.div`
  border-radius: 15px;
  background: ${Colors.white};
  box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
  width: 556px;
  height: 192px;
  box-sizing: border-box;
  padding: 49px 95px;
  gap: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 625px) {
    width: 320px;     
    padding: 40px 20px;
    height: auto;
    min-height: 170px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  width: 100%;
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

const Input = styled.input`
  box-sizing: border-box;
  width: 365px;
  height: 55px;
  border-radius: 11px;
  border: solid 2px
    ${(props) =>
      props.$hasError ? `${Colors.errorColor}` : `${Colors.inputColor}`};
  background: ${Colors.white};
  font-size: 15px;
  outline: none;
  padding: 20px 28px;

  &:focus {
    border: 2px solid
      ${(props) => (props.$hasError ? `${Colors.errorColor}` : `${Colors.mainPurple}`)};
  }

  @media (max-width: 625px) {
    width: 100%; 
    padding: 15px 20px;
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
`;

const ErrorMessage = styled.span`
  color: ${Colors.errorColor};
  font-family: "Noto Sans KR";
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (max-width: 625px) {
      font-size: 9px;
  }
`;

const CreateButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 556px;
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
  white-space: nowrap;

  cursor: ${(props) => (props.$isActive ? "pointer" : "default")};

  &:hover {
    background: ${Colors.hoverPurple};
  }
`;
