import react from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import ImsiLogoIcon from "../../assets/ImsiLogo.svg";
//로고 아이콘 추가하기

function Footer () {
    return(
        <FooterContainer>
            <FooterContent>
                <LeftSection>
                    <Logo src={ImsiLogoIcon} />
                    <Slogan>서로 다른 수면 성향을 돕는 룸메이트 수면 소통 플랫폼</Slogan>
                    <Description>
                        잠깐만, 우리 잠 얘기부터 해볼까?<br />
                        잠깐만은 말로 꺼내기 어려웠던 수면 기준을 대신 전해주고,<br />
                        서로 편안한 밤을 보낼 수 있도록 돕는 룸메이트 수면 합의 서비스입니다.
                    </Description>
                    <Detail>© 2026 zzamkanman. All rights reserved.</Detail>
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
                </RightSection>
            </FooterContent>
        </FooterContainer>
    );
}

export default Footer;

const FooterContainer = styled.div`
    width: 100%;
    background-color: #3E3E4A;
    padding: 60px 224px 88px 157px;
    box-sizing: border-box;
`;

const FooterContent = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const Logo = styled.img`
    width: 165px;
    margin-bottom: 12px;
`;

const Slogan = styled.p`
    color: ${Colors.white};
    font-family: ${Colors.font};
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    margin-bottom: 12px;
`;

const Description = styled.p`
    color: #EBEBEB;
    font-family: ${Colors.font};
    font-size: 9px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    margin-bottom: 4px;
`;

const Detail = styled.p`
    color: ${Colors.borderLine};
    font-family: ${Colors.font};
    font-size: 9px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
`;

const RightSection = styled.div`
  text-align: right;
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
  }
  
  td {
    text-align: left;
    padding-bottom: 4px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
  }
`;