import React, { createContext, useContext, useEffect, ReactNode } from "react";

import useRegistrations from "~/hooks/useRegistrations";
import { ActionResponse } from "~/types/ResponseAction";
import { Registration, RegistrationFilter } from "~/types/registration";

/**
 * Tipo de contexto para o contexto de registro.
 *
 * @typedef {Object} RegistrationContextType
 * @property {Registration[]} registrations - Lista de registros.
 * @property {boolean} loading - Indica se está carregando.
 * @property {string | null} error - Mensagem de erro, se houver.
 * @property {() => Promise<ActionResponse>} fetchRegistrations - Função assíncrona para buscar registros.
 * @property {(newRegistration: Omit<Registration, "id">) => Promise<ActionResponse>} addRegistration - Função assíncrona para adicionar um novo registro.
 * @property {(id: string, updatedFields: Partial<Registration>) => Promise<ActionResponse>} updateRegistration - Função assíncrona para atualizar um registro existente.
 * @property {(cpf: string) => Promise<ActionResponse>} fetchByCpf - Função assíncrona para buscar registros por CPF.
 * @property {(id: string) => Promise<ActionResponse>} deleteRegistration - Função assíncrona para excluir um registro.
 */
type RegistrationContextType = {
  registrations: Registration[];
  loading: boolean;
  error: string | null;
  fetchRegistrations: (filter?: RegistrationFilter) => Promise<ActionResponse>;
  setFilter: (filter: RegistrationFilter | null) => void;
  addRegistration: (
    newRegistration: Omit<Registration, "id">,
  ) => Promise<ActionResponse>;
  updateRegistration: (
    id: string,
    updatedFields: Partial<Registration>,
  ) => Promise<ActionResponse>;
  deleteRegistration: (id: string) => Promise<ActionResponse>;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined,
);

type RegistrationProviderProps = {
  children: ReactNode;
};

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({
  children,
}: RegistrationProviderProps) => {
  const {
    registrations,
    loading,
    error,
    fetchRegistrations,
    setFilter,
    addRegistration,
    updateRegistration,
    deleteRegistration,
  } = useRegistrations();

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        loading,
        error,
        setFilter,
        addRegistration,
        fetchRegistrations,
        updateRegistration,
        deleteRegistration,
      }}
    >
      <>{children}</>
    </RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrationContext must be used within a RegistrationProvider",
    );
  }
  return context;
};