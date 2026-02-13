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

    const[isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const[isFinalDeleteModalOpen, setIsFinalDeleteModalOpen] = useState(false);

    const handleSave = () => {
        //백엔드 연결 (방이름 저장관련)
        onSave(newRoomName);
        onClose();
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
        //방 삭제 관련
    };

    const handleFirstDeleteConfirm = () =>{
        setIsDeleteModalOpen(false);
        setIsFinalDeleteModalOpen(true);
    }; 

    const handleFinalDeleteConfirm = () => {
        onDelete();
        //백엔드에 삭제 요청
        setIsFinalDeleteModalOpen(false);
        onClose(); //전체 모달 닫기
    };

    if(!isOpen) return null;

    return(
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <TopGroup>
                    <ModalIcon src={TitlePencil} />
                    <ModalTitle>방 정보 수정하기</ModalTitle>
                    <CloseButton src={closeIcon} onClick={onClose} />
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

            {isDeleteModalOpen && (
                <DeleteRoomModal
                    onClose={()=> setIsDeleteModalOpen(false)}
                    onConfirm={handleFirstDeleteConfirm}/>
            )}

            {isFinalDeleteModalOpen && (
                <RealDeleteModal
                    onClose={()=> setIsFinalDeleteModalOpen(false)}
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
`;

const ModalContainer = styled.div`
  background: ${Colors.white};
  border-radius: 15px;
  width: 555px;
  padding: 43px 97px 19px 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TopGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 33px; 
  position: relative;
  width: 100%;
`;

const ModalIcon = styled.img`
  width: 54px; 
  margin-bottom: 11px;
`;

const ModalTitle = styled.p`
  color: ${Colors.black};
  font-family: ${Colors.font};
  text-align: center;
  line-height: 30px;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

const CloseButton = styled.img`
  position: absolute;
  top: -34px; // 위치 조정 필요
  right: -34px; // 위치 조정 필요
  width: 32px;
  cursor: pointer;
`;

const InputGroup = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 36px;
`;

const Label = styled.p`
  color: ${Colors.detailBlack};
  font-family: ${Colors.font};
  font-size: 13px;
  font-weight: 700;
  lign-height: 15px;
  margin-bottom: 15px; 
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 36px;
`;

const Input = styled.input`
  width: 100%;
  height: 55px;
  border-radius: 12px;
  box-shadow: ${Colors.boxShadowBlack};
  padding: 14px 15px;
  font-size: 19px;

  box-sizing: border-box;
`;

const EditIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
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
  margin-bottom: 9px;

  &:hover {
    opacity: 0.3;
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