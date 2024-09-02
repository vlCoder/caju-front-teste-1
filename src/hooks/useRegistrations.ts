import axios from "axios";
import { useEffect, useState, useCallback } from "react";

import { ActionResponse } from "~/types/ResponseAction";
import { Registration, RegistrationFilter } from "~/types/registration";
import { convertDateSeparator, removeNonNumeric } from "~/utils/utilsText";

/**
 * Hook que gerencia as cadastros.
 *
 * @returns Um objeto contendo as cadastros, o estado de carregamento, mensagens de erro e funções para manipular as cadastros.
 */
const useRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<RegistrationFilter | null>(null);
  const apiUrl = "http://localhost:3000";

  const _refreshRegistrations = async () => {
    filter ? await fetchRegistrations(filter) : await fetchRegistrations();
  };

  /**
   * Função assíncrona que busca as cadastros de acordo com um filtro opcional.
   *
   * @param filter - O filtro opcional para a busca das cadastros.
   * @returns Uma promessa que resolve em um objeto de resposta contendo o resultado da busca.
   *          - success: Um valor booleano indicando se a busca foi bem-sucedida.
   *          - message: Uma mensagem de sucesso ou erro, dependendo do resultado da busca.
   */
  const fetchRegistrations = useCallback(
    async (filter?: RegistrationFilter): Promise<ActionResponse> => {
      setLoading(true);
      const formattedFilter = {
        ...filter,
        cpf: filter?.cpf ? removeNonNumeric(filter.cpf) : undefined,
      };
      try {
        const response: { data: Registration[] } = await axios.get(
          `${apiUrl}/registrations`,
          { params: formattedFilter },
        );
        setRegistrations(response.data);
        const messageByFilter = filter?.cpf
          ? "Cadastros carregados com sucesso, filtrados por CPF"
          : "Cadastros carregados com sucesso";
        return {
          success: true,
          message: messageByFilter,
        };
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch registrations",
        );
        return {
          success: false,
          message: "Falha ao carregar cadastros",
        };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /**
   * Adiciona um novo cadastro.
   *
   * @param newRegistration - O novo cadastro a ser adicionado.
   * @returns Uma promessa que resolve em um objeto contendo informações sobre o resultado da operação.
   */
  const addRegistration = async (
    newRegistration: Omit<Registration, "id">,
  ): Promise<ActionResponse> => {
    const formattedRegistration: Omit<Registration, "id"> = {
      ...newRegistration,
      cpf: removeNonNumeric(newRegistration.cpf),
      admissionDate: convertDateSeparator(newRegistration.admissionDate),
    };
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/registrations`, formattedRegistration);
      await _refreshRegistrations();
      return {
        success: true,
        message: "Cadastro atualizado com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to add registration",
      );
      return {
        success: false,
        message: "Falha ao adicionar cadastro",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Atualiza um registro de cadastro.
   *
   * @param id - O ID do registro de cadastro a ser atualizado.
   * @param updatedFields - Os campos atualizados do registro de cadastro.
   * @returns Uma promessa que resolve em um objeto de resposta de ação.
   *          - success: Um valor booleano indicando se a atualização foi bem-sucedida.
   *          - message: Uma mensagem descrevendo o resultado da atualização.
   */
  const updateRegistration = async (
    id: string,
    updatedFields: Partial<Registration>,
  ): Promise<ActionResponse> => {
    setLoading(true);
    const registration = registrations.find((r) => r.id === id);
    if (!registration) {
      setError("Registration not found");
      setLoading(false);
      return {
        success: false,
        message: "Registro não encontrado",
      };
    }
    const mergedRegistration = { ...registration, ...updatedFields };
    try {
      await axios.put(`${apiUrl}/registrations/${id}`, mergedRegistration);
      await _refreshRegistrations();
      return {
        success: true,
        message: "Cadastro atualizado com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update registration",
      );
      return {
        success: false,
        message: "Falha ao atualizar cadastro",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deleta um registro pelo seu ID.
   *
   * @param id - O ID do registro a ser deletado.
   * @returns Uma Promise que resolve em um objeto de resposta contendo informações sobre o sucesso ou falha da operação.
   */
  const deleteRegistration = async (id: string): Promise<ActionResponse> => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/registrations/${id}`);
      await _refreshRegistrations();
      return {
        success: true,
        message: "Cadastro deletado com sucesso",
      };
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete registration",
      );
      return {
        success: false,
        message: "Falha ao deletar cadastro",
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return {
    registrations,
    loading,
    error,
    setFilter,
    fetchRegistrations,
    addRegistration,
    updateRegistration,
    deleteRegistration,
  };
};

export default useRegistrations;