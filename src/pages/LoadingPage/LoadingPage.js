import react, {useEffect, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import GoBackPage from "../../components/common/BackButton";
import sendAccessTokenToBackend from "../../api/sendAccessTokenToBackend";

//사용자의 authorization code를 받는 페이지 
//1. 구글 로그인 성공 -> 구글이 authorizaion code를 URL에 담아 리다이렉트
//2. URLSearchParams로 URL에서 authorization code를 추출 
//3. axios로 authorization code를 백엔드에 전송
//4. 백엔드가 구글에 code를 검증하고 access token 발급
//5. 백엔드에서 받은 access token을 localStoarge에 저장(sendAccessTokenToBackend)
//6. 성공 시 (/room) "RoomStartPage로 이동"
//7. 실패 시 (/) "LandingPage"로 이동

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                //URL에서 authorization code 추출
                const parseQuery = new URLSearchParams(window.location.search);
                const code = parseQuery.get("code");

                console.log("Authorization code:", code);

                //code가 없으면 error처리 -> landingPage로 이동
                if (!code) {
                    console.error("Authorization code가 URL에 없습니다");
                    alert("로그인에 실패했습니다. 다시 시도해주세요");
                    navigate("/");
                    return;
                }

                //백엔드로 authorization code 전송
                await sendAccessTokenToBackend(code);

                //성공 시, RoomStartPage로 이동
                navigate("/room");

            } catch (error) {
                console.error("로그인 과정에서 에러 발생", error);

                //실패 시 사용자에게 알림 후 로그인 페이지로 이동
                alert("로그인에 실패했습니다. 다시 시도해주세요");
                navigate("/");
            }
        };

        fetchData();
    }, [navigate]);
    
    return(
        <PageContainer>
            <GoBackPage/>
            <TitleGroup>
                <Title>ZZZ</Title>
                <SubTitle>잠시만 기다려주세요..로그인중</SubTitle>
            </TitleGroup>
        </PageContainer>
    );
};

export default LoadingPage;

//styled-components
const PageContainer = styled.div`
    width: 100 %;
    min-height: 100vh;
    background: ${ Colors.backgroundColor };
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 43px;
    padding-bottom: 269px;
    position: relative;
    box-sizing: border-box;
`;

const TitleGroup = styled.div`
    text-align: center;
    margin-top: 164px;
`;

const Title = styled.p`
    color: ${ Colors.detailBlack };
    text-align: center;
    font-family: ${ Colors.font };
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    margin-bottom: 15px;
`;

const SubTitle = styled.p`
    color: ${ Colors.detailBlack };
    text-align: center;
    font-family: ${ Colors.font };
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 0;
`;