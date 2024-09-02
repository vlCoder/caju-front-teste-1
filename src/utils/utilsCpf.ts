import { cpf as cpfValidator } from "cpf-cnpj-validator";

/**
 * Verifica se um CPF é válido.
 * @param cpf - O CPF a ser validado.
 * @returns Verdadeiro se o CPF for válido, falso caso contrário.
 */
const isValidCpf = (cpf: string): boolean => {
  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const shouldTriggerValidation = cpfPattern.test(cpf);
  return shouldTriggerValidation && cpfValidator.isValid(cpf);
};

/**
 * Valida a mudança de um campo de entrada de CPF.
 * @param value: O valor do campo de entrada.
 * @returns Um objeto contendo o valor do CPF e uma mensagem de erro, se houver.
 */
export const validateCpfChange = (value: string) => {
  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  const isCompleted = cpfPattern.test(value);
  const isValid = isCompleted && isValidCpf(value);
  return {
    value,
    error: isCompleted ? (isValid ? "" : "CPF inválido") : "",
    isCompleted,
  };
};

/**
 * Máscara para formatação de CPF.
 */
export const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

export const cpfUtils = {
  validateCpfChange,
  cpfMask,
};

export default cpfUtils;