import React from "react";
import { HiOutlineX } from "react-icons/hi";
import Modal from "react-modal";
import styled from "styled-components";

import { IconButton } from "~/components/Buttons/IconButton";

const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 30,
  },
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

const ModalBody = styled.div`
  padding: 0 24px 24px;
`;

export type CustomModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};

const CustomModal = ({
  isOpen,
  onRequestClose,
  children,
}: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <ModalHeader>
        <IconButton onClick={onRequestClose} aria-label="close">
          <HiOutlineX size={24} />
        </IconButton>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default CustomModal;