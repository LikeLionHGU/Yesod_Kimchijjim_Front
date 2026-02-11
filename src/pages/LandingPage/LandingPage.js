import react, { useState } from "react";
import styled from "styled-components";
import { Await, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import InfoIconImg from "../../assets/info.svg";
import NoIconTitleSection from "../../components/common/NoIconTitleSection";
import GoBackPage from "../../components/common/BackButton";
import axios from "axios";
import GoogleIcon from "../../assets/googleIcon.svg";
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";

//시작 로그인 페이지 
//google oauth url과 연결된 구글 로그인 버튼이 있어야한다. 

const LandingPage = () => {
    // const handleGoogleLogin = () => {
    //     window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`;
    // }; 

    // return(
    //     <PageContainer>
    //         <LoginBtn onClick={handleGoogleLogin}>
    //             <Icon src={GoogleIcon}/> Google로 시작하기
    //         </LoginBtn>
    //     </PageContainer>
    // )

    const navigate = useNavigate();

    const handleLoginSuccess = (response) => {
        const idToken = response.credential;
        console.log("구글 ID 토큰 확보", idToken);

        navigate("/loading", {state:{idToken:idToken}});
    }; 

    const handleLoginError = () => {
        console.log("Login Failed");
        alert("로그인 실패");
    };

    // const handleLoginSuccess = async(Response) => {
    //     const idToken = Response.credential;
    //     console.log("구글 ID 토큰", idToken);

    //     try{
    //         const res = await axios.post(`${process.env.REACT_APP_HOST_URL}/auth/google`, {
    //             idToken: idToken,
    //         }, {
    //             withCredentials: true
    //         });

    //         console.log("백엔드 로그인 성공:", res.data);
    //         alert("로그인 되었습니다");
    //     } catch(error) {
    //         console.error("로그인 실패:",error);
    //         alert("로그인 처리 중 오류 발생");
    //     }
    // };

    return(
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`}>
            <PageContainer>
                <h1>로그인 페이지</h1>

                {/* 5. 구글 로그인 버튼 컴포넌트 */}
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginError}
                />
            </PageContainer>
        </GoogleOAuthProvider>
    );
};

export default LandingPage;

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

// const LoginBtn = styled.div`
//     display: flex;
//     width: 270px;
//     height: 57px;
//     padding: 10px;
//     justify-content: center;
//     align-items: center;
//     gap: 10px;

//     border-radius: 31px;
//     border: 1px solid ${Colors.white};
//     background: ${Colors.white};
//     box-shadow: 1px 1px 7.4px 0 ${Colors.boxShadowBlack};

//     color: ${Colors.black};
//     text-align: center;
//     font-family: ${Colors.font};
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 27px;

//     white-space: nowrap;
//     box-sizing: border-box;

//     cursor: pointer;

//     &:hover{
//         opacity: 0.7;
//     }
// `;

// const Icon = styled.img`
//     width: 21px;
//     height: 21px;
// `;