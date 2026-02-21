
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import TrashIcon from "../../assets/trashcan.svg";
import CloseIcon from "../../assets/closeIcon.svg";

const RealDeleteModal = ({onClose, onConfirm}) => {
    return(
        <Overlay>
            <Container onClick={(e) => e.stopPropagation()}>
                <CloseButton src={CloseIcon} alt="" onClick={onClose} />

                <Content>
                    <IconWrapper>
                        <img src={TrashIcon} alt="" />
                    </IconWrapper>

                    <Title>진짜 삭제하겠습니까?</Title>
                    <Description>방을 삭제하면 모든 정보가 사라지며, 다시 복구할 수 없어요</Description>

                    <ButtonGroup>
                        <CancelButton onClick={onClose}>취소할게요</CancelButton>
                        <DeleteButton onClick={onConfirm}>삭제할게요</DeleteButton>
                    </ButtonGroup>
                </Content>

            </Container>
        </Overlay>
    );
};

export default RealDeleteModal;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;

    padding: 0 20px;
    box-sizing: border-box;
`;

const Container = styled.div`
    //width: 555px;
    //height: 336px;
    width: 100%;
    max-width: 555px;
    height: auto;
    min-height: 336px;

    padding: 54px 94px 44px 94px;
    box-sizing: border-box;
    border-radius: 15px;
    background: ${Colors.white};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 600px) {
        padding: 45px 20px 30px 20px;
        min-height: auto;
    }
`;


const CloseButton = styled.img`
  position: absolute;
  top: 34px; 
  right: 34px; 
  width: 32px;
  cursor: pointer;
  
  @media (max-width: 600px) {
      top: 20px;
      right: 20px;
      width: 28px;
  }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //margin-top: 54px;
    width: 100%; //추가
`;

const IconWrapper = styled.div`
    margin-bottom: 11px;
    weight: 46px;
    img {
        width: 100%;
        height: auto;
    }
`;

const Title = styled.p`
    font-size: 22px;
    font-family: ${Colors.black};
    line-height: 30px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 11px;
    color: ${Colors.black};

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

const Description = styled.p`
    font-size: 15px;
    color: ${Colors.detailBlack};
    text-align: center;
    line-height: 15px;
    margin-bottom: 54px;
    margin-top: 0;

    @media (max-width: 600px) {
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 40px;
        word-break: keep-all;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
    justify-content: center;

    @media (max-width: 600px) {
        gap: 10px;
    }
`;

const ButtonBase = styled.button`
    width: 175px;
    height: 55px;
    border-radius: 11px;
    font-size: 18px;
    font-weight: 700;
    border: none;
    cursor: pointer;
`;

const CancelButton = styled(ButtonBase)`
    background: ${Colors.inputColor};
    color: ${Colors.white};
`;

const DeleteButton = styled(ButtonBase)`
    background: ${Colors.errorColor}; 
    color: white;
`;