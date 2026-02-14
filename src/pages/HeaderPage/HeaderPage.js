import react, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import ImsiLogoIcon from "../../assets/ImsiLogo.svg";

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
                <LeftSection onClick={!isTesting ? () => navigate("/") : undefined}>
                    <Logo src={ImsiLogoIcon} />
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
    width: 100%;
    background-color: ${Colors.white};
    padding: 8px 157px;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 100;
`;

const HeaderContent = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftSection = styled.div`
    display: flex;
    cursor: ${props => (props.$isTesting ? "default" : "pointer")};
`;

const Logo = styled.img`
    width: 92px;
    height: auto;
`;

const RightSection = styled.div`
  text-align: right;
  align-items: center;
`;

const BtnGroup = styled.div`
    display: flex;
    gap: 66px;
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
    line-height: 27px;    
`;