import React from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import TrashIcon from "../../assets/trashcan.svg";
import CloseIcon from "../../assets/closeIcon.svg";

const RealDeleteModal = ({onClose, onConfirm}) => {
    return(
        <Overlay>
            <Container onClick={(e) => e.stopPropagation()}>
                <Content>
                    <IconWrapper>
                        <img src={TrashIcon} />
                    </IconWrapper>

                    <CloseButton src={CloseIcon} onClick={onClose} />

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
`;

const Container = styled.div`
    background: white;
    width: 555px;
    height: 336px;
    padding: 30px 20px;
    border-radius: 15px;
    background: ${Colors.white};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const CloseButton = styled.img`
  position: absolute;
  top: -34px; 
  right: -34px; 
  width: 32px;
  cursor: pointer;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 54px;
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
    margin-bottom: 11px;
    color: ${Colors.black};
`;

const Description = styled.p`
    font-size: 15px;
    color: ${Colors.detailBlack};
    text-align: center;
    line-height: 15px;
    margin-bottom: 54px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
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
    background: ${Colors.errorColor}; 
    color: white;
`;