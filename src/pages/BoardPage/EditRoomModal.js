import React, {useState} from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import TitlePencil from "../../assets/Pencil_purple.svg";
import editPecil from "../../assets/Pencil.svg";
import closeIcon from "../../assets/closeIcon.svg";

const RoomEditModal = ({currentRoomName, onClose}) => {
    const [newRoomName, setNewRoomName] = useState(currentRoomName);

    const handleUpdate = () => {
        console.log("수정된 방 이름:", newRoomName);
        onClose();
    };

}

//styled-components

const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.50);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    width: 555px;
    height: 421px;
    background: ${Colors.white};
    border-radius: 20px;
    padding: 43px 97px 19px 98px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseButton = styled.img`
    position: absolute;
    top: 34px; right: 34px;
    cursor: pointer;
    width: 32px;
`;

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 11px;
    margin-bottom: 33px;
`