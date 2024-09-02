import styled from "styled-components";

import Button from "~/components/Buttons";
import CustomModal, { CustomModalProps } from "~/components/ModalCustom";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ModalTitle = styled.h3`
  margin: 8px 0;
  font-size: 24px;
  font-weight: 600;
`;

const ModalText = styled.p`
  margin-bottom: 16px;
`;

export type ConfirmationModalProps = Omit<CustomModalProps, "children"> & {
  title: string;
  text: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

/**
 * O componente ConfirmationModal exibe uma caixa de diálogo modal com uma mensagem de confirmação e botões para confirmar ou cancelar a ação.
 *
 * @component
 * @param {ConfirmationModalProps} props - As propriedades do componente.
 * @param {boolean} props.isOpen - Determina se o modal está aberto ou fechado.
 * @param {() => void} props.onRequestClose - Função de callback para lidar com a solicitação de fechamento do modal.
 * @param {() => void} props.onConfirm - Função de callback para lidar com a ação de confirmação.
 * @param {string} props.title - O título do modal.
 * @param {string} props.text - O conteúdo de texto do modal.
 * @param {string} [props.confirmText="Confirmar"] - O texto a ser exibido no botão de confirmação.
 * @param {string} [props.cancelText="Cancelar"] - O texto a ser exibido no botão de cancelamento.
 * @returns {JSX.Element} O componente ConfirmationModal renderizado.
 */
const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  title,
  text,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmationModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalText>{text}</ModalText>
        <ModalActions>
          <Button
            onClick={onRequestClose}
            $themeType="secondary"
            aria-label="cancel"
          >
            {cancelText}
          </Button>
          <Button onClick={onConfirm} aria-label="confirm">
            {confirmText}
          </Button>
        </ModalActions>
      </ModalContent>
    </CustomModal>
  );
};

export default ConfirmationModal;