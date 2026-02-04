import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";

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
`;

const BackButton = styled.button`
    position: absolute;
    top: 90px;
    left: 157px; 
    border-radius: 11px;
    background: ${Colors.white};
    box-shadow: 0 0 10px 0 ${Colors.boxShadowBlack};
    display: flex;
    width: 39px;
    height: 39px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;

    &:hover{
        opacity: 0.5;
    }
`;

const TitleSection = styled.div`
    text-align: center;
    
`;

const Title = styled.p`
    color: ${Colors.black};
    text-align: cneter;
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
    line-height: 30px;
    bottom-padding: 64px;
`;

const Card = styled.div`
    border-radius: 15px;
    background: ${Colors.white};
    box-shadow: 0 0 15px 0 ${Colors.boxShadowPurple};
    width: 936px;
    height: 329px;
    box-sizing: border-box;
    display: flex; 
    flex-direction: column;
    gap: 30px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px; 
`;

const Label = styled.label`
    display: block; 
    font-weight: 700; 
    font-size: 15px;
    font-family: ${Colors.font};
    font-style: normal; 
    color: ${Colors.detailBlack};
    line-height: 15px;
`;

const Input = styled.input`
    width: 100%;
    max-width: 365px;
    height: 55px;
    border-radius: 11px;
    border: solid ${props => (props.$hasError ? `2px ${Colors.errorColor}` : `1px ${Colors.borderLine}`)};
    background: ${Colors.white};
    font-size: 15px;
    outline: none;
    padding: 20px 28px;

    &:focus{
        border: 2px solid ${props => (props.$hasError ? `${Colors.errorColor}` : `${Colors.mainPurple}`)};
    }   
`; 

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
`;

const ErrorMessage = styled.span`
    color: ${Colors.errorColor};
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

const MemberContainer = styled.div`
    display: flex;
    gap: 15px;
`;

const MemberButton = styled.button`
    display: flex;
    width: 80px;
    height: 55px;
    padding: 20px 28px;
    justify-content: center;
    align-items: center;
    border-radius: 11px;
    border: solid ${props => (props.$isSelected ? `2px ${Colors.mainPurple}` : `1px ${Colors.borderLine}`)};
    background: ${Colors.white};

    
    color: ${props => (props.$isSelected ? `${Colors.mainPurple}` : `${Colors.borderLine}`)};
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 15px;

    &:hover{
        border: 1px solid ${Colors.mainPurple};
        opacity: 0.7;
    }
`;

const CreateButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 936px;
    justify-content: flex-end;
    margin-top: 20px;
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
    opacity: ${props => (props.$isActive ? 1:0.3)};
    background: ${Colors.mainPurple};
    border: none;

    color: ${Colors.white};
    font-family: "Noto Sans KR";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;

    cursor: ${props => (props.$isActive ? 'pointer' : 'not-allowed')};

    &:hover{
        opacity: 0.7;
    }
`;

const RoomCreatePage = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    const[myName, setMyname] = useState('');
    const[roomName, setRoomName] = useState('');
    const[member, setMember] = useState(null);

    const [isNameError, setIsNameError] = useState(flase);
    const [isRoomError, setIsRoomError] = useState(false);
}; 

const handleNameChange = (e) => {
    const value = e.target.value;
    setMyname(value);

    const regex = /^[가-힣a-zA-Z]+$/;

    if (value.length === 0) {
        setIsNameError(false);
        return;
    }

    if (value.length<2||value.length>10|| !regex.test(value)) {
        setIsNameError(true);
    } else{
        setIsNameError(false);
    }
};

const handleRoomChange = (e) => {
    const value = e.target.value;
    setRoomName(value);

    if(value.length === 0) {
        setIsRoomError(false);
        return;
    }

    if(value.length<2 ||value.length>10){
        setIsRoomError(true);
    } else{
        setIsRoomError(false);
    }
};

const isActive = 
    !isNameError && myName.length >= 2 &&
    !isRoomError && roomName.length >= 2 &&
    member !== null;

const handleCreate = () => {
    if(!isActive) return;

    console.log('방 생성 정보: ', {myName, roomName, member});
    alert(`[${roomName}] 방이 생성되었습니다! (인원: ${member}명)`);
};

return(
    <PageContainer>
        <BackButton onClick={handleGoBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M9.41406 1.41406L2.82812 8L9.41406 14.5859L8 16L0 8L8 0L9.41406 1.41406Z" fill="#A2A2A2" />
            </svg>
        </BackButton>

        <TitleSection>
            <Title>방 만들기</Title>
            <SubTitle>룸메이트와 함께 사용할 방을 만들어보세요</SubTitle>
        </TitleSection>

        <Card>
            {/*내 이름*/}
            <FormGroup>
                <Label>내 이름</Label>
                <Input
                    type="text"
                    value={myName}
                    onChange={handleNameChange} //변경된 핸들러 연결
                    $hasError={isNameError} //에러 상태 전달
                />

                {/*에러일 때만 메시지 표시 */}
                {isNameError && <ErrorContainer>
                    <ErrorMessage>한국어·영문만 사용 가능하며, 이름은 2~10자로 입력해주세요</ErrorMessage>    
                </ErrorContainer>}
            </FormGroup>

            {/* 방 이름 입력 */}
            <FormGroup>
                <Label>방 이름</Label>
                <Input
                    type="text"
                    value={roomName}
                    onChange={handleRoomChange}
                    $hasError={isRoomError}
                />
                {isRoom}
            </FormGroup>
        </Card>
    </PageContainer>
)