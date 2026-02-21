
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import TrashIcon from "../../assets/trashcan.svg";
import CloseIcon from "../../assets/closeIcon.svg";

const DeleteRoomModal = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;

    return(
        <Overlay>
            <Container onClick={(e)=>e.stopPropagation()}>
                <CloseButton src={CloseIcon} alt="" onClick={onClose} />
                <Content>
                    <IconWrapper>
                        <img src = {TrashIcon} alt=""/>
                    </IconWrapper>

                    <Title>방 삭제하기</Title>
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

export default DeleteRoomModal;

const Overlay = styled.div`
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

const Container = styled.div`
    background: white;
    width: 555px;
    height: 336px;
    padding: 54px 94px 44px 94px;
    border-radius: 15px;
    background: ${Colors.white};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const CloseButton = styled.img`
  position: absolute;
  top: 34px; 
  right: 34px; 
  width: 32px;
  cursor: pointer;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //margin-top: 54px;
`;

const IconWrapper = styled.div`
    margin-bottom: 11px;
    weight: 46px;
`;

const Title = styled.p`
    font-size: 22px;
    font-family: ${Colors.black};
    line-height: 30px;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 11px;
    color: ${Colors.black};
`;

const Description = styled.p`
    font-size: 15px;
    color: ${Colors.detailBlack};
    text-align: center;
    line-height: 15px;
    margin-bottom: 54px;
    margin-top: 0;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
    justify-content: center;
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
    background: ${Colors.mainPurple}; 
    color: white;
`;