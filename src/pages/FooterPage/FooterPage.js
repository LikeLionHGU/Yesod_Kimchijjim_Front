
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import WhiteLogoIcon from "../../assets/whiteLogoIcon.svg";
//로고 아이콘 추가하기

function Footer () {
    return(
        <FooterContainer>
            <FooterContent>
                <LeftSection>
                    <Logo src={WhiteLogoIcon} />
                    <Slogan>서로 다른 수면 성향 간 합의를 돕는 룸메이트 수면 소통 플랫폼</Slogan>
                    <Description>
                        잠깐만, 우리 잠 얘기부터 해볼까?<br />
                        잠깐만은 말로 꺼내기 어려웠던 수면 기준을 대신 전해주고,<br />
                        서로 편안한 밤을 보낼 수 있도록 돕는 룸메이트 수면 합의 서비스입니다.
                    </Description>
                </LeftSection>

                <RightSection>
                    <TeamTable>
                        <tbody>
                            <tr>
                                <th style={{ fontSize: 11, fontWeight: 700, paddingBottom: 18.5 }}>Team</th>
                                <td style={{paddingBottom: 18.5}}>예소드김치찜</td>
                            </tr>
                            <tr>
                                <th>Planner</th>
                                <td>최서연</td>
                            </tr>
                            <tr>
                                <th>Frontend</th>
                                <td>박형찬<br/> 최세희</td>
                            </tr>
                            <tr>
                                <th>Backend</th>
                                <td>곽동우<br /> 임규민</td>
                            </tr>
                            <tr>
                                <th>Designer</th>
                                <td>현하나</td>
                            </tr>
                        </tbody>
                    </TeamTable>
                    <Detail>© 2026 zzamkanman. All rights reserved.</Detail>
                </RightSection>
            </FooterContent>
        </FooterContainer>
    );
}

export default Footer;

const FooterContainer = styled.div`
    width: 100%;
    background-color: #303030;
    padding: 64px 157px 47px 157px;
    box-sizing: border-box;

    @media (max-width: 1024px) {
    padding: 64px 40px 47px 40px; 
    }

    @media (max-width: 768px) {
    padding: 40px 20px 40px 20px;
    }
`;

const FooterContent = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    
    @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px; 
    }
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const Logo = styled.img`
    width: 235px;
    margin-bottom: 25px;
`;

const Slogan = styled.p`
    color: ${Colors.white};
    font-family: ${Colors.font};
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    margin-bottom: 14px;
`;

const Description = styled.p`
    color: #EBEBEB;
    font-family: ${Colors.fixGray};
    font-size: 9px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
`;

const Detail = styled.p`
    color: ${Colors.borderLine};
    font-family: ${Colors.font};
    font-size: 9px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    margin-top: 27px;
`;

const RightSection = styled.div`
  text-align: right;
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const TeamTable = styled.table`
  color: ${Colors.white};
  font-family: ${Colors.font};
  font-size: 10px;
  border-collapse: collapse; //셀 사이 빈틈 없애기
  
  th {
    text-align: left;
    padding-right: 10px;
    font-weight: 400;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    vertical-align: top; //이름이 두 줄일 때 제목이 위로
    white-space: nowrap;
  }
  
  td {
    text-align: left;
    padding-bottom: 4px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    white-space: nowrap;
  }
`;