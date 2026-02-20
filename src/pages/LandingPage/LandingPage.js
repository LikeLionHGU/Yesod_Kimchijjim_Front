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

    const token = localStorage.getItem("idToken");
    //const roomCode = sessionStorage.getItem("currentRoomCode");

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

                <HeroWrapper>
                    <HeroBackground />

                    <ContentContainer>
                        <FirstTextGroup>
                            <FirstTitle>서로 다른 수면 성향 간 합의를<br />돕는 룸메이트 수면 소통 플랫폼</FirstTitle>
                            <LoginButtonWrapper>
                                {!token && (
                                    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
                                )}
                            </LoginButtonWrapper>
                        </FirstTextGroup>
                        <FirstTalkIcon>
                            <img src={talkIcon} alt="" />
                        </FirstTalkIcon>
                    </ContentContainer>

                    <ScrollIcon src={downIcon} alt="" />

                </HeroWrapper>

                {/* 2 주요 기능 구역*/}
                <SecondSection>
                    <SectionTitle>주요 기능</SectionTitle>
                    <SectionSubTitle>룸메이트와의 관계를 지키면서 수면 규칙을 만들어보세요</SectionSubTitle>

                    <CardGrid>
                        <FeatureCard>
                            <CardIcon src={functionIcon1} $width = "91px" $top="16px" $right="18px" alt=""/>
                            <CardTextGroup>
                                <CardTitle>질문 기반 테스트</CardTitle>
                                <CardDesc>각자의 수면 기준을 카드형 질문으로 확인하고,<br />자동으로 규칙을 생성해요</CardDesc>
                            </CardTextGroup>
                        </FeatureCard>
                        <FeatureCard>
                            <CardIcon src={functionIcon2} $width="125px" $top="5px" $right="7.5px"  alt="" />
                            <CardTextGroup>
                                <CardTitle>자동 중재 기능</CardTitle>
                                <CardDesc>의견이 다를 때, 잠깐만이 대화를 정리하고<br />중간 지점을 찾도록 도와줘요</CardDesc>
                            </CardTextGroup>
                        </FeatureCard>
                        <FeatureCard>
                            <CardIcon src={functionIcon3} $width="101px" $top="10px" $right="11.68px"  alt="" />
                            <CardTextGroup>
                                <CardTitle>알림 보내기</CardTitle>
                                <CardDesc>학기 중 생기는 불편한 부분을<br/>의견보드에 공유할 수 있어요</CardDesc>
                            </CardTextGroup>
                        </FeatureCard>
                    </CardGrid>
                </SecondSection>

                <ThirdSection>
                    <SectionTitle>사용 방법</SectionTitle>
                    <SectionSubTitle>4단계로 만드는 우리방의 수면 규칙</SectionSubTitle>

                    <StepBlock>
                        <TextColumn>
                            <StepText>
                                <StepNumber>1</StepNumber>
                                <StepTitle>방 만들기</StepTitle>
                                <StepDesc>룸메이트와 함께 사용할<br />방을 만드세요</StepDesc>
                            </StepText>
                            <StepText>
                                <StepNumber>2</StepNumber>
                                <StepTitle>테스트 진행</StepTitle>
                                <StepDesc>룸메이트와 동시에 접속하여<br /> 실시간으로 기준을 맞춰가요</StepDesc>
                            </StepText>
                        </TextColumn>
                        <ImageColumn>
                            <ExImg1 src={exampleImg1} alt=""/>
                            <ExImg2 src={exampleImg2} alt=""/>
                        </ImageColumn>
                    </StepBlock>

                    <StepBlock $reverse>
                        <TextColumn>
                            <StepText>
                                <StepNumber>3</StepNumber>
                                <StepTitle>규칙 확정하기</StepTitle>
                                <StepDesc>우리방의 성향을 통합한 <br />규칙을 확정한 후 리마인드해줘요</StepDesc>
                            </StepText>
                            <StepText>
                                <StepNumber>4</StepNumber>
                                <StepTitle>알림 활용</StepTitle>
                                <StepDesc>생활 중 이야기 하고 싶은 것이<br />있다면 잠깐만이 대신 전해줘요</StepDesc>
                            </StepText>
                        </TextColumn>
                        <ImageColumn>
                            <ExImg3 src={exampleImg3} alt=""/>
                            <ExImg4 src={exampleImg4} alt=""/>
                        </ImageColumn>
                    </StepBlock>
                </ThirdSection>

                {/* 4️ 핵심 가치 구역*/}
                <FourthSection>
                    <SectionTitle>핵심 가치</SectionTitle>
                    <SectionSubTitle>우리 서비스의 가치는 이러해요</SectionSubTitle>

                    <ValueGrid>
                        <ValueItem>
                            <ValueIcon src={valueIcon1} alt=""/>
                            <ValueTitle>혼자 No 모두가 함께 참여</ValueTitle>
                            <ValueDesc>누구의 잘못이 아닌,<br/>서로 다른 수면 기준을 실시간으로 보여줘요</ValueDesc>
                        </ValueItem>
                        <ValueItem>
                            <ValueIcon src={valueIcon2} alt="" />                       
                            <ValueTitle>안전한 표현 방식</ValueTitle>
                            <ValueDesc>말로 꺼내기 어려운 기준도<br/>비대면으로 편하게 드러낼 수 있어요</ValueDesc>
                        </ValueItem>
                        <ValueItem>
                            <ValueIcon src={valueIcon3} alt="" />                            
                            <ValueTitle>합의로 이어지는 결과 </ValueTitle>
                            <ValueDesc>결과는 판단이 아니라,<br/>함께 정하는 수면 규칙으로 이어져요</ValueDesc>
                        </ValueItem>
                    </ValueGrid>
                </FourthSection>

                <FinalSection>
                    <FinalTitle>우리 방의 수면 규칙을 만들어보세요</FinalTitle>
                    <LoginButtonWrapper>
                        {!token && (
                            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
                        )}
                    </LoginButtonWrapper>
                </FinalSection>
                <BottomSection/>

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

const ContentContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    //padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    position: relative; //추가
    z-index: 1; //추가

    @media (max-width: 950px) {
        flex-direction: column;
        text-align: center;
        align-items: center;
        justify-content: center;
        gap: 40px;
    }
`;

/* 1. 메인 보라색 구역 */
const HeroWrapper = styled.div`
    position: relative; 
    width: 100%;
    min-height: 835px;
    background-color: #F6F5FC;

    @media (max-width: 1024px) {
        min-height: 700px;
    }

    @media (max-width: 768px) {
        min-height: 800px; 
    }
`;

const HeroBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0; 
    background-image: url(${purplefront}), url(${purpleback});
    background-repeat: no-repeat, no-repeat;
    
    background-position: center bottom, center bottom;
    background-size: 100% auto, 100% auto;

    @media (max-width: 1490px) {
        background-size: cover, cover; 
    }
    
    @media (max-width: 768px) {
        background-position: center bottom, center bottom;
        background-size: cover, cover;
    }
`;

const FirstTextGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 150px;
    margin-left: 97px;
    gap: 249px;
    
    @media (max-width: 1210px) {
        align-items: center;
        gap: 150px;
    }

    @media (max-width: 950px) {
        margin-top: 80px;
        margin-left: 0;
        gap: 60px;
    }
`;

const FirstTitle = styled.h1`
    color: ${Colors.white};
    font-size: 36px;
    font-weight: 700;
    font-style: normal;
    line-height: 53px;
    margin: 0;

    @media (max-width: 1210px) {
        font-size: 26px;
        text-align: center;
    }
`;

const LoginButtonWrapper = styled.div`
    width: fit-content;

    @media (max-width: 1210px) {
        margin: 0 auto;
        display: flex;
        justify-content: center;

    }
`;

const FirstTalkIcon = styled.div`
    width: 600px;
    height: auto;
    margin-top: 45px;
    align-self: flex-start;

    margin-right: 30px;

    img {
        width: 100%;
        height: auto;
        display: block;
    }

    @media (max-width: 1210px) {
        width: 450px;
        margin-right: 0;
    }

    @media (max-width: 950px) {
        width: 80%;
        max-width: 400px;
        margin-top: 20px;
        align-self: center;
    }
`;

const ScrollIcon = styled.img`
    width: 32px;
    height: auto;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;

    @media (max-width: 1024px) {
        bottom: -30px;
    }
`;

/* 공통 섹션 제목 */
const SectionTitle = styled.h2`
    font-size: 27px;
    font-weight: 700;
    color: ${Colors.black};
    text-align: center;
    margin: 0 0 7px 0;

    @media (max-width: 768px) { font-size: 22px; }
`;

const SectionSubTitle = styled.p`
    font-size: 18px;
    color: ${Colors.detailBlack};
    text-align: center;
    margin: 0 0 55px 0;

    @media (max-width: 768px) { 
        font-size: 15px; 
        margin-bottom: 35px;
    }
`;

/* 2. 주요 기능 구역 */
const SecondSection = styled.div`
    padding: 90px 156px;
    background-color: #F6F5FC;

    @media (max-width: 1024px) { padding: 80px 40px; }
    @media (max-width: 768px) { padding: 60px 20px; }
`;

const CardGrid = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
    justify-content: center;

    @media (max-width: 1360px) {
        flex-wrap: wrap;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const FeatureCard = styled.div`
    background: ${Colors.white};
    border-radius: 15px;
    padding: 0 0 23px 23px;
    width: 100%;
    max-width: 365px;
    height: 192px;

    box-sizing: border-box;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);

    position: relative;
    overflow: hidden;

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const CardIcon = styled.img`
    width: ${(props) => props.$width || "65px"};
    height: auto;

    position: absolute;
    z-index: 1;

    top: ${(props) => props.$top || "0px"};
    right: ${(props) => props.$right || "0px"};
`;

const CardTextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;

    position: absolute;
    left: 23px;
    bottom: 23px;
    z-index: 2;
    width: calc(100% - 46px);
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

/* 3. 사용 방법 구역 */
const ThirdSection = styled.div`
    padding: 100px 20px;
    background-color: white;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) { padding: 60px 20px; }
`;

const StepBlock = styled.div`
    display: flex;

    flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
    justify-content: space-between;
    
    margin-top: 87px;
    margin-bottom: 150px; 
    gap: 52px;

    @media (max-width: 950px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 80px;
    }
`;

const TextColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 115px;
    width: 300px;

    @media (max-width: 950px) {
        gap: 50px;
        width: 100%;
        align-items: center;
        margin-bottom: 40px;
    }
`;

const ImageColumn = styled.div`
    flex: 1;
    position: relative; 
    width: 100%;
    min-height: 500px; 

    @media (max-width: 1024px) {
        transform: scale(0.8);
        transform-origin: top center;
        min-height: 400px;
    }

    @media (max-width: 950px) {
        transform: scale(0.6);
        min-height: 350px;
        display: flex;
        justify-content: center;
    }

    @media (max-width: 768px) {
        transform: scale(0.5); 
        min-height: 250px;
    }
`;

const ExImg1 = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 350px;
    height: auto;
    border-radius: 11px;

    @media (max-width: 950px) { 
        left: 50%; 
        transform: translateX(-292px); 
    }
`;

const ExImg2 = styled.img`
    position: absolute;
    top: 144px;
    left: 312px;
    z-index: 2;
    width: 435px;
    height: auto;
    border-radius: 11px;

    @media (max-width: 950px) { 
        left: 50%; 
        transform: translateX(-142px); 
    }
`;

const ExImg3 = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 290px;
    height: auto;
    border-radius: 11px;

    @media (max-width: 950px) { 
        left: 50%; 
        transform: translateX(-291px); 
    }
`;

const ExImg4 = styled.img`
    position: absolute;
    top: 176px;
    left: 171px;
    z-index: 2;
    width: 482px;
    height: auto;
    border-radius: 11px;

    @media (max-width: 950px) { 
        left: 50%; 
        transform: translateX(-191px); 
    }
`;

const StepText = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

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
    margin-bottom: 10px;
`;

const StepTitle = styled.h3`
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 27px;
    color: ${Colors.black};
    margin: 0;
`;

const StepDesc = styled.p`
    color: ${Colors.black};
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px
    margin: 0;
    margin-top: 19px;
`;


/* 4. 핵심 가치 구역 */
const FourthSection = styled.div`
    padding: 80px 115px;
    background-color: #F6F5FC;

    @media (max-width: 1024px) { padding: 80px 40px; }
    @media (max-width: 768px) { padding: 60px 20px; }
`;

const ValueGrid = styled(CardGrid)`
    gap: 105px;
    margin-top: 83px;

    @media (max-width: 1024px) { gap: 50px; }
    @media (max-width: 768px) { gap: 40px; margin-top: 40px; }
`;

const ValueIcon = styled.img`
    width: 182px;
    height: auto;

    @media (max-width: 768px) { width: 140px; }
`;

const ValueItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    width: 100%;
    max-width: 305px;

    @media (max-width: 768px) { max-width: 100%; }
`;

const ValueTitle = styled.h3`
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 27px; 
    margin: 28px 0 0 0;
    color: ${Colors.detailBlack};
`;

const ValueDesc = styled.p`
    color: ${Colors.detailBlack};
    margin: 0;
    margin-top: 15px;
`;

const FinalSection = styled.div`
    padding: 92px 20px 31px 39px;
    background: white; 
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 21px;

    @media (max-width: 768px) {
        padding: 60px 20px 20px 20px;
    }
`;

const FinalTitle = styled.h2`
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: 27px
    text-align: center;
    margin: 0;

    @media (max-width: 768px) { font-size: 22px; line-height: 1.4; }
`;

const BottomSection = styled.div`
    width: 100%;
    
    height: 112px; 
    
    background-image: url(${bottomPurpleFront}), url(${bottomPurpleBack});
    
    background-position: center top, center top;
    
    background-size: 100% auto, 100% auto;
    
    background-repeat: no-repeat, no-repeat;
`;