import  { useEffect} from "react";
import styled from "styled-components";
import {  useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";

import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from "@react-oauth/google";

//시작 로그인 페이지 
//설치 : npm install @react-oauth/google axios


console.log("프론트엔드에서 사용하는 Client ID:", process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID);

const LandingPage = () => {

    const navigate = useNavigate();

    //로그인 하면 보드페이지로 이동하는 
    useEffect(()=>{
        const token = localStorage.getItem("idToken");
        const roomCode = sessionStorage.getItem("currentRoomCode");

        if(token){
            if(roomCode) {
                navigate("/board", {replace:true});
            } else {
                navigate("/room", {replace:true});
            }
        }
    }, [navigate]);

    const handleLoginSuccess = (response) => {
        //구글이 준 응답에서 credential이 idToken
        const idToken = response.credential;
        console.log("구글 ID 토큰 확보: ", idToken);

        navigate("/loading", {state:{idToken:idToken}});
    }; 


    const handleLoginError = () => {
        console.log("Login Failed");
        alert("로그인 실패");
    };

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