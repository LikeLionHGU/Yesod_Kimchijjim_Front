import  {useEffect} from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";
import GoBackPage from "../../components/common/BackButton";
import sendAccessTokenToBackend from "../../api/sendAccessTokenToBackend";
import IngIcon from "../../assets/ingVideo.gif";
import TitleSection from "../../components/common/TitleSection";

const LoadingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=>{
        const processLogin = async() => {
            const idToken = location.state?.idToken;

            if(!idToken){
                alert("인증 정보가 없습니다");
                navigate("/");
                return;
            }

            //localStorage.setItem("idToken", idToken);

            try{
                const response = await sendAccessTokenToBackend(idToken);

                localStorage.setItem("idToken", idToken);
                
                const userRoomCode = response?.roomCode; //백엔드가 주는 방코드, 로그인 응답에 방 코드 어떻게 주는지 물어보기 

                if(userRoomCode){
                    sessionStorage.setItem("currentRoomCode", userRoomCode);
                    navigate("/board");
                } else {
                    navigate("/room");
                }
            } catch(error) {
                console.error("로그인 처리 에러:", error);
                localStorage.removeItem("idToken");
                alert("로그인 처리 중 오류 발생");
                navigate("/");
            }
        };

        processLogin();
    }, [navigate, location]);

    // useEffect(()=>{

    //     const processLogin = async() => {
    //         const idToken = location.state?.idToken;

    //         if(!idToken){
    //             alert("인증 정보가 없습니다");
    //             navigate("/");
    //             return;
    //         }

    //         localStorage.setItem("idToken", idToken);

    //         try{
    //             await sendAccessTokenToBackend(idToken);
    //             navigate("/room");
    //         } catch(error) {
    //             console.error("로그인 처리 에러:", error);
    //             alert("로그인 처리 중 오류 발생");
    //             navigate("/");
    //         }
    //     };

    //     processLogin();
    // }, [navigate,location]);

    
    return(
        <PageContainer>
            <GoBackPage/>
            <TitleSection
                iconSrc={IngIcon}
                titleText={""}
                subTitleText={"잠시만 기다려주세요"}
            />
        </PageContainer>
    );
};

export default LoadingPage;

//styled-components
const PageContainer = styled.div`
    width: 100%;
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