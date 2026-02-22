import React, {useState} from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import TitlePencil from "../../assets/Pencil_purple.svg";
import editPecil from "../../assets/Pencil.svg";
import closeIcon from "../../assets/closeIcon.svg";
import DeleteRoomModal from "./DeleteRoomModal";
import RealDeleteModal from "./RealDeleteModal";

const RoomEditModal = ({isOpen, onClose, currentRoomName, onSave, onDelete}) => {
    const [newRoomName, setNewRoomName] = useState(currentRoomName);

    //0:수정모달, 1: 삭제 경고, 2: 진짜 삭제
    const [modalStep, setModalStep] = useState(0);

    const handleSave = () => {
      onSave(newRoomName);
      onClose();
    };

    const handleDeleteClick = () => {
      setModalStep(1);
    };

    const handleFirstDeleteConfirm = () => {
      setModalStep(2);
    };

    const handleFinalDeleteConfirm = () => {
      onDelete();
      setModalStep(0);
      onClose();
    };

    const handleCloseAll = () => {
      setModalStep(0);
      onClose();
    }
    // const[isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // const[isFinalDeleteModalOpen, setIsFinalDeleteModalOpen] = useState(false);

    // const handleSave = () => {
    //     //백엔드 연결 (방이름 저장관련)
    //     onSave(newRoomName);
    //     onClose();
    // };

    // const handleDeleteClick = () => {
    //     setIsDeleteModalOpen(true);
    //     //방 삭제 관련
    // };

    // const handleFirstDeleteConfirm = () =>{
    //     setIsDeleteModalOpen(false);
    //     setIsFinalDeleteModalOpen(true);
    // }; 

    // const handleFinalDeleteConfirm = () => {
    //     onDelete();
    //     //백엔드에 삭제 요청
    //     setIsFinalDeleteModalOpen(false);
    //     onClose(); //전체 모달 닫기
    // };

    if(!isOpen) return null;

    return(
        <ModalOverlay onClick={handleCloseAll}>
          {modalStep === 0 && (
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton src={closeIcon} onClick={onClose} />
                <TopGroup>
                    <ModalIcon src={TitlePencil} />
                    <ModalTitle>방 정보 수정하기</ModalTitle>
                </TopGroup>

                <InputGroup>
                    <Label>방 이름</Label>
                    <InputWrapper>
                        <Input
                            type="text"
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                        />
                        <EditIcon src={editPecil} />
                    </InputWrapper>
                </InputGroup>

                <SaveButton onClick={handleSave}>수정 완료</SaveButton>

                <DeleteButton onClick={handleDeleteClick}>방 삭제</DeleteButton>
            </ModalContainer>
          )}

            {modalStep === 1 && (
                <DeleteRoomModal
                    isOpen={true}
                    onClose={()=> setModalStep(0)}
                    onConfirm={handleFirstDeleteConfirm}/>
            )}

            {modalStep === 2 && (
                <RealDeleteModal
                    onClose={()=> setModalStep(0)}
                    onConfirm={handleFinalDeleteConfirm}
                />
            )}
        </ModalOverlay>
    );
};

export default RoomEditModal;

//styled-components

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // 배경 어둡게
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // 최상단
  
  padding: 0 20px; //추가
  box-sizing: border-box; //추가
`;

const ModalContainer = styled.div`
  background: ${Colors.white};
  border-radius: 15px;
  //width: 555px;
  width: 100%;
  max-width: 555px;
  height: auto; //추가
  min-height: 421px; //추가
  
  padding: 54px 97px 35px 98px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    padding: 40px 20px 25px 20px;
  }
`;

const TopGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 33px; 
  position: relative;
  width: 100%;

  @media (max-width: 600px) {
    margin-bottom: 25px;
  }
`;

const ModalIcon = styled.img`
  width: 54px; 
  margin-bottom: 11px;

  @media (max-width: 600px) {
    width: 45px;
  }
`;

const ModalTitle = styled.p`
  color: ${Colors.black};
  font-family: ${Colors.font};
  text-align: center;
  line-height: 30px;
  font-size: 22px;
  font-weight: 700;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 19px;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  top: 34px; // 위치 조정 필요
  right: 34px; // 위치 조정 필요
  width: 32px;
  cursor: pointer;

  @media (max-width: 600px) {
    top: 20px;
    right: 20px;
    width: 28px;
  }
`;

const InputGroup = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 36px;

  @media (max-width: 600px) {
    margin-bottom: 25px;
  }
`;

const Label = styled.p`
  color: ${Colors.detailBlack};
  font-family: ${Colors.font};
  font-size: 13px;
  font-weight: 700;
  lign-height: 15px;
  margin-bottom: 15px; 
  margin-top: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  //margin-bottom: 36px;
`;

const Input = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 12px;
  box-shadow: ${Colors.boxShadowBlack};
  padding: 14px 15px;
  font-size: 19px;

  box-sizing: border-box;
  border: 2px solid ${Colors.inputColor};

      &:focus{
          border: 2px solid ${Colors.mainPurple};
      }
  
      &:hover{
          border: 2px solid ${Colors.mainPurple};
      }

    @media (max-width: 600px) {
    height: 50px;
    font-size: 16px;
  }
`;

const EditIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;

  @media (max-width: 600px) {
    width: 20px;
    right: 15px;
  }
`;

const SaveButton = styled.button`
  width: 135px;
  height: 52px;
  border-radius: 10px;
  background: ${Colors.mainPurple};
  border: none;
  color: ${Colors.white};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    background: ${Colors.hoverPurple};
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.mainPurple};
  font-family: ${Colors.font};
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  cursor: pointer;
`;