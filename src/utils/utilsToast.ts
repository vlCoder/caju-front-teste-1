import { toast } from "react-toastify";

import { ActionResponse } from "~/types/ResponseAction";

/**
 * Exibe um toast de sucesso ou erro com base na resposta da ação.
 * @param actionResponse - A resposta da ação.
 */
export const showToast = (actionResponse: ActionResponse) => {
  if (actionResponse.success) {
    toast.success(actionResponse.message);
  } else {
    toast.error(actionResponse.message);
  }
};