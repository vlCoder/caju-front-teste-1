import { useState } from "react";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { ButtonSmall } from "~/components/Buttons";
import ConfirmationModal from "~/components/ModalConfirmation";
import { useRegistrationContext } from "~/contexts/ContextRegistre";
import { ActionResponse } from "~/types/ResponseAction";
import { Registration, RegistrationStatus } from "~/types/registration";
import { showToast } from "~/utils/utilsToast";

import * as S from "./styles";

type Props = {
  data?: Registration;
  isLoading?: boolean;
};

type ModalContent = {
  title: string;
  text: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

const RegistrationCard = ({ data, isLoading = false }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const { updateRegistration, deleteRegistration } = useRegistrationContext();

  const openModal = (modalContent: ModalContent) => {
    setModalContent(modalContent);
    setIsModalOpen(true);
  };

  const _closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const deleteRegistrationAction = async (id: Registration["id"]) => {
    const response: ActionResponse = await deleteRegistration(id);
    showToast(response);
    _closeModal();
  };

  const updateRegistrationAction = async ({
    id,
    status,
  }: {
    id: Registration["id"];
    status: RegistrationStatus;
  }) => {
    const response = await updateRegistration(id, { status });
    _closeModal();
    showToast(response);
  };

  const handleReprovarClick = () =>
    openModal({
      title: "Reprovar Review",
      text: `Tem certeza que deseja reprovar o review de ${data?.employeeName}?`,
      onConfirm: () => {
        updateRegistrationAction({
          id: data!.id,
          status: RegistrationStatus.REPROVED,
        });
      },
      confirmText: "Sim, reprovar",
      cancelText: "Não, cancelar",
    });

  const handleAprovarClick = () =>
    openModal({
      title: "Aprovar Review",
      text: `Tem certeza que deseja aprovar o review de ${data?.employeeName}?`,
      onConfirm: () => {
        updateRegistrationAction({
          id: data!.id,
          status: RegistrationStatus.APPROVED,
        });
      },
      confirmText: "Sim, aprovar",
      cancelText: "Não, cancelar",
    });

  const handleRevisarNovamenteClick = () =>
    openModal({
      title: "Revisar novamente",
      text: `Tem certeza que deseja revisar novamente o review de ${data?.employeeName}?`,
      onConfirm: () => {
        updateRegistrationAction({
          id: data!.id,
          status: RegistrationStatus.REVIEW,
        });
      },
      confirmText: "Sim, revisar",
      cancelText: "Não, cancelar",
    });

  const handleDeleteClick = () =>
    openModal({
      title: "Excluir",
      text: `Tem certeza que deseja excluir o cadastro de ${data?.employeeName}?`,
      onConfirm: () => {
        deleteRegistrationAction(data!.id);
      },
      confirmText: "Sim, excluir",
      cancelText: "Não, cancelar",
    });

  return (
    <>
      <S.Card data-testid="registration-card">
        <S.IconAndText>
          <HiOutlineUser />
          {isLoading ? (
            <S.Skeleton height="24px" />
          ) : (
            <h3>{data?.employeeName}</h3>
          )}
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          {isLoading ? (
            <S.Skeleton height="20px" />
          ) : (
            <span>{data?.email}</span>
          )}
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          {isLoading ? (
            <S.Skeleton height="20px" />
          ) : (
            <span>{data?.admissionDate}</span>
          )}
        </S.IconAndText>
        <S.Actions>
          {data?.status === RegistrationStatus.REVIEW ? (
            <>
              <ButtonSmall
                $bgcolor="rgb(255, 145, 154)"
                onClick={handleReprovarClick}
                aria-label="Reprovar"
              >
                Reprovar {data?.status}
              </ButtonSmall>
              <ButtonSmall
                $bgcolor="rgb(155, 229, 155)"
                onClick={handleAprovarClick}
                aria-label="Aprovar"
              >
                Aprovar
              </ButtonSmall>
            </>
          ) : (
            <ButtonSmall
              $bgcolor="#ff8858"
              onClick={handleRevisarNovamenteClick}
              aria-label="Revisar novamente"
            >
              Revisar novamente
            </ButtonSmall>
          )}
          <HiOutlineTrash onClick={handleDeleteClick} aria-label="Excluir" />
        </S.Actions>
      </S.Card>
      {modalContent && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          title={modalContent.title}
          text={modalContent.text}
          cancelText={modalContent.cancelText}
          confirmText={modalContent.confirmText}
          onConfirm={modalContent.onConfirm}
        />
      )}
    </>
  );
};

export const EmptyStateRegistrationCard = ({
  status,
}: {
  status: RegistrationStatus;
}) => {
  return (
    <S.Card>
      <S.CardEmptyMessage $status={status}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            fontSize: "42px",
            width: "1em",
            height: "auto",
            shapeRendering: "geometricPrecision",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25 21.75 6.615 21.75 12 17.385 21.75 12 21.75zM11.25 6.75a.75.75 0 011.5 0v6a.75.75 0 01-1.5 0V6.75zm.75 9a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25z"
          />
        </svg>
        <h3>Nenhum cadastro encontrado</h3>
        <p>
          Por favor, adicione um novo cadastro ou atualize os cadastros
          existentes.
        </p>
      </S.CardEmptyMessage>
    </S.Card>
  );
};

export default RegistrationCard;
