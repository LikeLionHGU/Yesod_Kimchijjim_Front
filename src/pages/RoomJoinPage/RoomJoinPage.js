import react, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import TitleSection from "../../components/common/TitleSection";
import GoBackPage from "../../components/common/BackButton";
import TitleIcon from "../../assets/Ellipse 5.svg";

const RoomJoinPage = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [isUserNameError, setIsUserNameError] = useState(false);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setUserName(value);

        const regex = /^[가-힣a-zA-Z]+$/;

        if(value.length === 0) {
            setIsUserNameError(false);
            return;
        }

        if(value.length < 2 || value.length > 10 || !regex.test(value)) {
            setIsUserNameError(true);
        } else {
            setIsUserNameError(false);
        }
    };

    const isActive = 
        !isUserNameError && userName.length >= 2;


    const handleWait = () => {
        if(!isActive) return;

        navigate("/room/member/wait");
    };

    return(
        <PageContainer>
            <GoBackPage/>
            <TitleSection
                iconSrc={TitleIcon}
                titleText={"방 들어가기"}
                subTitleText={"우리 방에 들어가요"}
            />
            <Card>
                <FormGroup>
                    <Label>내 이름</Label>
                    <Input
                        type="text"
                        value={userName}
                        onChange={handleNameChange}
                        $hasError={isUserNameError}
                    />

                    {isUserNameError && <ErrorContainer>
                        <IconImage src={InfoIconImg}/>
                        <ErrorMessage>한국어·영문만 사용 가능하며, 이름은 2~10자로 입력해주세요</ErrorMessage>
                        </ErrorContainer>}
                </FormGroup>
            </Card>
            
            <CreateButtonWrapper>
                <CreateButton
                    $isActive={isActive}
                    disabled={!isActive}
                    onClick={handleWait}>대기실 입장하기</CreateButton>
            </CreateButtonWrapper>
        </PageContainer>
    );
};

export default RoomJoinPage;

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

const Card = styled.div`
    border-radius: 15px;
    background: ${Colors.white};
    box-shadow: 0 0 15px 0 rgba(163, 163, 253, 0.30);
    width: 556px;
    height: 192px;
    box-sizing: border-box;
    padding: 49px 95px;
    gap: 0;
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
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
    border: solid ${props => (props.$hasError ? `2px ${Colors.errorColor}` : `1px ${Colors.borderLine}`)};
    background: ${Colors.white};
    font-size: 15px;
    outline: none;
    padding: 20px 28px;

    &:focus{
        border: 2px solid ${props => (props.$hasError ? `${Colors.errorColor}` : `${Colors.mainPurple}`)};
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
`;

const CreateButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 556px;
    justify-content: flex-end;
    margin-top: 20px;

    @media(max-width: 950px){
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
    opacity: ${props => (props.$isActive ? 1: 0.3)};
    background: ${Colors.mainPurple};
    border: none;

    color: ${Colors.white};
    font-family: "Noto Sans KR";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    white-space: nowrap;

    cursor: ${props => (props.$isActive ? 'pointer' : 'default')};

    &:hover:not(:disabled){
        opacity: 0.7;
    }
`;