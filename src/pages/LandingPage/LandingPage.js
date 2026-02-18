import  { useEffect} from "react";
import styled from "styled-components";
import {  useNavigate } from "react-router-dom";
import { Colors } from "../../styles/colors";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

//메인 보라색 
import purplefront from "../../assets/landingpurplefront.svg";
import purpleback from "../../assets/landingpurpleback.svg";
import talkIcon from "../../assets/landingTalk.svg";
import downIcon from "../../assets/landingdoubledown.svg";

//주요기능
import functionIcon1 from "../../assets/landingIcon1.svg";
import functionIcon2 from "../../assets/landingIcon2.svg";
import functionIcon3 from "../../assets/landingIcon3.svg";

//사용방법
import exampleImg1 from "../../assets/landingEx1.svg";
import exampleImg2 from "../../assets/landingEx2.svg";
import exampleImg3 from "../../assets/landingEx3.svg";
import exampleImg4 from "../../assets/landingEx4.svg";

//핵심가치
import valueIcon1 from "../../assets/landingIcon4.svg";
import valueIcon2 from "../../assets/landingIcon5.svg";
import valueIcon3 from "../../assets/landingIcon6.svg";

//하단
import bottomPurpleFront from "../../assets/landingBottomFront.svg";
import bottomPurpleBack from "../../assets/landingBottomBack.svg";

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

            <PageWrapper>
                <FirstSection>
                    <ContentContainer>
                        <FirstTextGroup>
                            <FirstTitle>서로 다른 수면 성향 간 합의를<br/>돕는 룸메이트 수면 소통 플랫폼</FirstTitle>
                            <LoginButtonWrapper>
                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onError={handleLoginError}
                                />
                            </LoginButtonWrapper>
                        </FirstTextGroup>
                        <FirstTalkIcon>
                            <img src={talkIcon} alt=""/>
                        </FirstTalkIcon>
                    </ContentContainer>
                </FirstSection>

                <ScrollIcon src={downIcon} alt=""/>

                {/* 2 주요 기능 구역*/}
                <SecondSection>
                    <SectionTitle>주요 기능</SectionTitle>
                    <SectionSubTitle>룸메이트와의 관계를 지키면서 수면 규칙을 만들어보세요</SectionSubTitle>

                    <CardGrid>
                        <FeatureCard>
                            <CardIcon src={functionIcon1} $width = "91px" alt=""/>
                            <CardTextGroup>
                                <CardTitle>질문 기반 테스트</CardTitle>
                                <CardDesc>각자의 수면 기준을 카드형 질문으로 확인하고,<br />자동으로 규칙을 생성해요</CardDesc>
                            </CardTextGroup>
                        </FeatureCard>
                        <FeatureCard>
                            <CardIcon src={functionIcon2} $width="125px" alt="" />
                            <CardTextGroup>
                                <CardTitle>자동 중재 기능</CardTitle>
                                <CardDesc>의견이 다를 때, 잠깐만이 대화를 정리하고<br />중간 지점을 찾도록 도와줘요</CardDesc>
                            </CardTextGroup>
                        </FeatureCard>
                        <FeatureCard>
                            <CardIcon src={functionIcon3} $width="101px" alt="" />
                            <CardTextGroup>
                                <CardTitle>알림 보내기</CardTitle>
                                <CardDesc>학기 중 생기는 불편한 부분을<br/>의견보드에 공유할 수 있어요</CardDesc>
                            </CardTextGroup>
                        </FeatureCard>
                    </CardGrid>
                </SecondSection>

                {/* 3 사용 방법 구역*/}
                <ThirdSection>
                    <SectionTitle>사용 방법</SectionTitle>
                    <SectionSubTitle>4단계로 만드는 우리방의 수면 규칙</SectionSubTitle>

                    {/* Step 1 & 2 (지그재그 레이아웃) */}
                    <StepRow>
                        <StepText>
                            <StepNumber>1</StepNumber>
                            <StepTitle>방 만들기</StepTitle>
                            <StepDesc>룸메이트와 함께 사용할<br/>방을 만드세요</StepDesc>
                        </StepText>
                        <StepImagePlaceHolder> {/* 화면 목업 이미지 1 */} </StepImagePlaceHolder>
                    </StepRow>

                    <StepRow>
                        <StepText>
                            <StepNumber>2</StepNumber>
                            <StepTitle>테스트 진행</StepTitle>
                            <StepDesc>룸메이트와 동시에 접속하여<br /> 실시간으로 기준을 맞춰가요</StepDesc>
                        </StepText>
                        <StepImagePlaceHolder> {/* 화면 목업 이미지 1 */} </StepImagePlaceHolder>
                    </StepRow>

                    <StepRow $reverse>
                        <StepText>
                            <StepNumber>3</StepNumber>
                            <StepTitle>규칙 확정하기</StepTitle>
                            <StepDesc>우리방의 성향을 통합한 <br/>규칙을 확정한 후 리마인드해줘요</StepDesc>
                        </StepText>
                        <StepImagePlaceHolder> {/* 화면 목업 이미지 2 */} </StepImagePlaceHolder>
                    </StepRow>

                    <StepRow $reverse>
                        <StepText>
                            <StepNumber>4</StepNumber>
                            <StepTitle>알림 활용</StepTitle>
                            <StepDesc>생활 중 이야기 하고 싶은 것이<br/>있다면 잠깐만이 대신 전해줘요</StepDesc>
                        </StepText>
                        <StepImagePlaceHolder> {/* 화면 목업 이미지 2 */} </StepImagePlaceHolder>
                    </StepRow>
                </ThirdSection>

                {/* 4️ 핵심 가치 구역*/}
                <FourthSection>
                    <SectionTitle>핵심 가치</SectionTitle>
                    <SectionSubTitle>우리 서비스의 가치는 이러해요</SectionSubTitle>

                    <ValueGrid>
                        <ValueItem>
                            {/* 3D 아이콘 1 */}
                            <ValueTitle>혼자 No 모두가 함께 참여</ValueTitle>
                            <ValueDesc>누구의 잘못이 아닌,<br/>서로 다른 수면 기준을 실시간으로 보여줘요</ValueDesc>
                        </ValueItem>
                        <ValueItem>
                            {/* 3D 아이콘 2 */}
                            <ValueTitle>안전한 표현 방식</ValueTitle>
                            <ValueDesc>말로 꺼내기 어려운 기준도<br/>비대면으로 편하게 드러낼 수 있어요</ValueDesc>
                        </ValueItem>
                        <ValueItem>
                            {/* 3D 아이콘 3 */}
                            <ValueTitle>합의로 이어지는 결과 </ValueTitle>
                            <ValueDesc>결과는 판단이 아니라,<br/>함께 정하는 수면 규칙으로 이어져요</ValueDesc>
                        </ValueItem>
                    </ValueGrid>
                </FourthSection>

                <FinalSection>
                    <FinalTitle>우리 방의 수면 규칙을 만들어보세요</FinalTitle>
                    <LoginButtonWrapper>
                        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
                    </LoginButtonWrapper>
                </FinalSection>

            </PageWrapper>
        </GoogleOAuthProvider>
    );
};

export default LandingPage;

//styled-components
const PageWrapper = styled.div`
    width: 100%;
    overflow-x: hidden; 
    font-family: ${Colors.font};
`;

/* 콘텐츠를 가운데로 모아주는 가이드라인 (최대 너비 1200px) */
const ContentContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 40px;
    }
`;

/* 1. 메인 보라색 구역 */
const FirstSection = styled.div`
    width: 100%;
    min-height: 700px;
    background-image: url(${purplefront}), url(${purpleback});
    background-position: center, center bottom;
    background-size: 100%, 100%;
    background-repeat: no-repeat, no-repeat;
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FirstTextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    
    @media (max-width: 768px) {
        align-items: center;
    }
`;

const FirstTitle = styled.h1`
    color: ${Colors.white};
    font-size: 36px;
    font-weight: 700;
    font-style: normal;
    line-height: 53px;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 28px;
        line-height: 1.4;
    }
`;

const LoginButtonWrapper = styled.div`
    width: fit-content;
`;

const FirstTalkIcon = styled.div`
    width: 500px;
    height: 400px;
    /* img { width: 100%; height: auto; object-fit: contain; } 주석 풀고 사용하세요 */

    @media (max-width: 768px) {
        width: 100%;
        height: 300px;
    }
`;

const ScrollIcon = styled.img`
    width: 32px;
    height: auto;
    display: block;
    margin: 0 auto;
    margin-bottom: 80px;
`

/* 공통 섹션 제목 */
const SectionTitle = styled.h2`
    font-size: 27px;
    font-weight: 700;
    color: ${Colors.black};
    text-align: center;
    margin: 0 0 7px 0;
`;

const SectionSubTitle = styled.p`
    font-size: 18px;
    color: ${Colors.detailBlack};
    text-align: center;
    margin: 0 0 55px 0;
`;

/* 2. 주요 기능 구역 */
const SecondSection = styled.div`
    padding: 90px 156px;
    background-color: #F6F5FC;
`;

const CardGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const FeatureCard = styled.div`
    background: ${Colors.white};
    border-radius: 15px;
    padding: 19px 23px 23px 23px;
    width: 100%;
    max-width: 365px;
    height: 192px;
    box-sizing: border-box;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
    display: flex;
    flex-direction: column;
    gap: 16px;

    justify-content: space-between;
`;

const CardIcon = styled.img`
    width: ${(props) => props.$width || "65px"};
    height: auto;
    align-self: flex-end;
`;

const CardTextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-self: flex-start;
    text-align: left;
`;

const CardTitle = styled.h3`
    font-size: 17px;
    font-weight: 700;
    line-height: 27px;
    color: ${Colors.mainPurple};
    margin: 0;
`;

const CardDesc = styled.p`
    font-size: 15px;
    font-weight: 500;
    color: ${Colors.detailBlack};
    line-height: 1.5;
    margin: 0;
`;

/* 3. 사용 방법 구역 (지그재그) */
const ThirdSection = styled.div`
    padding: 100px 20px;
    background-color: white;
    max-width: 1200px;
    margin: 0 auto;
`;

const StepRow = styled.div`
    display: flex;
    flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;
    gap: 50px;

    @media (max-width: 950px) {
        flex-direction: column; /* 모바일에서는 무조건 세로 배치 */
        text-align: center;
    }
`;

const StepText = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;

    @media (max-width: 950px) {
        align-items: center;
    }
`;

const StepNumber = styled.div`
    width: 39px;
    height: 39px;
    border-radius: 19.5px;
    background: #A3A3FD;
    color: ${Colors.white};
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StepTitle = styled.h3`
    font-size: 22px;
    margin: 0;
`;

const StepDesc = styled.p`
    color: ${Colors.detailBlack};
    margin: 0;
`;

const StepImagePlaceHolder = styled.div`
    flex: 1;
    width: 100%;
    height: 300px;
    background-color: #F0F0F0; // 이미지 넣기 전 임시 배경
    border-radius: 15px;
`;

/* 4. 핵심 가치 구역 */
const FourthSection = styled.div`
    padding: 100px 20px;
    background-color: #FAFAFA;
`;

const ValueGrid = styled(CardGrid)`
    gap: 40px;
`;

const ValueItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    width: 100%;
    max-width: 300px;
`;

const ValueTitle = styled.h3`
    font-size: 20px;
    margin: 10px 0 0 0;
`;

const ValueDesc = styled.p`
    color: ${Colors.detailBlack};
    margin: 0;
`;

/* 5. 하단 CTA 구역 */
const FinalSection = styled.div`
    padding: 120px 20px 150px 20px;
    background: white; // 맨 밑 보라색 곡선은 이미지로 처리하거나 CSS로 처리!
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

const FinalTitle = styled.h2`
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin: 0;
`;