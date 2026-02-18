import  { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import zzamkanmanLogoIcon from "../../assets/zzamkanmanLogo.svg";
import imgLogoIcon from "../../assets/imgLogo.svg";

//로고 아이콘 추가하기
//로그인 누르면 랜딩페이지로 가는데, 이거 어찌할까  
//스타일에 로고 사이즈 넣기 
//백엔드에도 로그아웃 했다고 알려줘야 하나? 


function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("idToken");
        setIsLoggedIn(!!token);
    }, [location.pathname]);

    const isTesting = location.pathname.includes("/room/test"); //테스트 중인지 확인

    const handleGoogleLogin = () => {
        //랜딩페이지로 이동
        navigate("/");
    };

    const handleLogout = () => {
        localStorage.removeItem("idToken");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("currentRoomCode");

        setIsLoggedIn(false);

        navigate("/");
    };

    return (
        <HeaderContainer>
            <HeaderContent>
                <LeftSection
                    $isTesting={isTesting}
                    onClick={!isTesting ? () => navigate("/") : undefined}>

                    {isTesting && (<Logo src={imgLogoIcon} $isTesting={isTesting}/>)}
                    {!isTesting && <Logo src={zzamkanmanLogoIcon} $isTestin={isTesting} />}
                </LeftSection>

                <RightSection>
                    {!isTesting && (
                        <BtnGroup>
                            <Button onClick={() => navigate("/room")}>방 시작하기</Button>

                            {isLoggedIn ? (<Button onClick={handleLogout}>로그아웃</Button>) : (<Button onClick={handleGoogleLogin}>로그인</Button>)}

                        </BtnGroup>
                    )}
                </RightSection>
            </HeaderContent>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.div`
    height: 61px;
    width: 100%;
    background-color: ${Colors.white};
    box-shadow: 0 2px 9.4px 0 ${Colors.boxShadowBlack};
    padding: 0 157px;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;

    @media(max-width: 1024px){
        padding: 0 40px;
    }

    @media(max-width: 768px){
        padding: 0 20px;
    }
`;

const HeaderContent = styled.div`
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    cursor: ${props => (props.$isTesting ? "default" : "pointer")};
`;

const Logo = styled.img`
    width: ${props => (props.$isTesting ? "auto" : "122px")};
    height: ${props => (props.$isTesting ? "41px" : "auto")};
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
`;

const BtnGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 66px;

    @media(max-width: 768px){
        gap: 20px;
    }
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;   

    color: ${Colors.detailBlack};
    font-family: ${Colors.font};
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;    
`;