//JWT token test page

import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import styled from "styled-components";

const TestPage = () => {
    const[authResult, setAuthResult] = useState("인증 확인 중!");
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchAuthStatus = async () => {
            try{
                //1. localStoarge에서 'accessToken'가져오기
                //로컬스토리지에서 토큰 가져오는 명령어 
                const token = localStorage.getItem("token");
                console.log("저장된 토큰:", token ? "있음" : "없음");
                
                if(!token){
                    setAuthResult("토큰이 없습니다. 로그인 필요합니다");
                    setTimeout(()=>{
                        navigate("/");
                    }, 2000);
                    return;
                }

                //axios를 사용하여 백엔드에 인증요청 보내기
                //요청 URL: process.env.REACT_APP_HOST_URL와 '/test'조합하여 만들기 
                //요청 헤더(headers): Authorization 헤더에 위에서 가져온 token을 'Bearer'형식으로 담아서 보내기
                
                const response = await axios.get(
                    `${process.env.REACT_APP_HOST_URL}/test`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, //토큰추가
                        },
                    }
                );

                console.log("서버 응답:", response.data);

                if(response.data == 1){
                    setAuthResult("인증성공!");

                    const userInfo = localStorage.getItem("userInfo");
                    if(userInfo){
                    //JSON.stringify() 객체를 문자열로 변환 (저장할 때)
                    //로컬스토리지는 글자(string)만 저장할 수 있기 때문에 
            
                    //JSON.parse() 문자열을 객체로 변환 (꺼내쓸 때)
                        const user = JSON.parse(userInfo);
                        console.log("변환된 유저 객체:", user); //밑의 name과 email을 그에 맞게 수정
                        setAuthResult(`인증 성공! 환영합니다, ${user.name}님! 이메일: ${user.email}`);
                    }
                } else{
                    setAuthResult("인증실패(서버에서 0반환");
                    console.log("인증실패-토큰삭제 및 로그인페이지로 이동");

                    //로컬스토리지에서 토큰 삭제
                    localStorage.removeItem("token");
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("memberId");

                    setTimeout(()=>{
                        navigate("/");
                    }, 2000);
                }
            } catch(error) {

                setAuthResult("인증실패");
                console.log("Error during authentication:", error);

                //로컬스토리지에서 토큰 삭제
                localStorage.removeItem("token");
                localStorage.removeItem("userInfo");
                localStorage.removeItem("memberId");

                setTimeout(()=>{
                    navigate("/");
                }, 2000);
            }
        };

        fetchAuthStatus();
    }, [navigate]);

    return (
        <PageContainer>
            <div style={{ padding: "2rem" }}>
                <h2>JWT 인증 테스트</h2>
                <p style={{ whiteSpace: "pre-line", fontSize: "18px" }}>
                    결과: {authResult}
                </p>

                {authResult.includes("실패") && (
                    <p style={{ color: "#666", fontSize: "14px", marginTop: "1rem" }}>
                        2초 후 로그인 페이지로 이동합니다...
                    </p>
                )}
            </div>
        </PageContainer>
    );
};

export default TestPage;

//styled-components
const PageContainer = styled.div`
    width: 100 %;
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