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
    const [hasRoom, setHasRoom] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("idToken");
        const roomCode = sessionStorage.getItem("currentRoomCode");

        setIsLoggedIn(!!token);
        setHasRoom(!!roomCode);
    }, [location.pathname]);

    const isTesting =
        location.pathname === "/room/test" ||
        location.pathname === "/room/wait" ||
        location.pathname.startsWith("/test/");
    const isBoardPage = location.pathname === "/board";
    const isLandingPage = location.pathname === "/"; 

    const handleStartRoomClick = () => {
        if (!isLoggedIn){
            alert("로그인이 필요한 서비스입니다. 먼저 로그인을 해주세요");
            return;
        }

        navigate("/room");
    };

    const handleLogout = () => {
        localStorage.removeItem("idToken");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("currentRoomCode");

        setIsLoggedIn(false);
        setHasRoom(false);

        navigate("/");
    };

    const handleLogoClick = () => {
        if(isTesting) return;

        if(isLoggedIn && hasRoom){
            if(isBoardPage){ //로그인했고, 방 있고, 보드페이지 일 때 -> 새로고침
                window.location.reload();
            } else {
                navigate("/board"); //로그인했고, 방 있고, 보드페이지가 아니라면 -> 보드페이지로 
            }
        } else{
            navigate("/"); //로그인을 안했거나, 했는데 방이 없거나 일 때 -> 어떻게 할까?
        }
    };

    return (
        <HeaderContainer>
            <HeaderContent>
                <LeftSection
                    $isTesting={isTesting}
                    onClick={handleLogoClick}>

                    {isTesting ? (
                        <Logo src={imgLogoIcon} $isTesting={isTesting} />
                    ) : (
                        <Logo src={zzamkanmanLogoIcon} $isTesting={isTesting} />
                    )}
                </LeftSection>

                <RightSection>
                    {!isTesting && (
                        <BtnGroup>
                            {isLoggedIn && hasRoom ? (
                                <>
                                    {isBoardPage && (
                                        <Button onClick={() => navigate("/")}>About Us</Button>
                                    )}
                                    <Button onClick={handleLogout}>Log Out</Button>
                                </>
                            ) : (
                                     <>
                                        {isLandingPage ? (
                                            <Button onClick={handleStartRoomClick}>방 시작하기</Button>
                                        ) : (
                                            <Button onClick={() => navigate("/")}>About Us</Button>
                                        )}

                                        {isLoggedIn && (
                                            <Button onClick={handleLogout}>Log Out</Button>
                                        )}
                                    </>
                            )}
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
    font-size: 16.5px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;    

    &:hover{
        color: ${Colors.hoverPurple};
    }

    @media(max-width: 768px){
        font-size: 14px;
    }
`;