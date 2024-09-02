/**
 * Remove todos os caracteres não numéricos de uma string.
 *
 * @param text - A string da qual os caracteres não numéricos devem ser removidos.
 * @returns A string resultante após a remoção dos caracteres não numéricos.
 */
export const removeNonNumeric = (text: string) => text.replace(/\D/g, "");

/**
 * Converte a data de um formato com hífens para um formato com barras.
 *
 * @param date - A string da data no formato "dd-mm-aaaa".
 * @returns A string da data no formato "dd/mm/aaaa".
 */
export const convertDateSeparator = (date: string) =>
  date.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, "$3/$2/$1");