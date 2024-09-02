import { useState, ChangeEvent } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import { useRegistrationContext } from "~/contexts/ContextRegistre";
import routes from "~/router/routes";
import { cpfMask, validateCpfChange } from "~/utils/utilsCpf";
import { showToast } from "~/utils/utilsToast";

import * as S from "./styles";

export const SearchBar = () => {
  const history = useHistory();
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [previousCpf, setPreviousCpf] = useState("");
  const { fetchRegistrations, setFilter } = useRegistrationContext();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleCpfChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value, error, isCompleted } = validateCpfChange(event.target.value);
    setCpf(value);
    setCpfError(error);

    if (isCompleted && !error && value !== previousCpf) {
      setFilter({ cpf: value });
      const response = await fetchRegistrations({ cpf: value });
      showToast(response);
      setPreviousCpf(value);
    } else if (!isCompleted && previousCpf) {
      const response = await fetchRegistrations();
      showToast(response);
      setPreviousCpf("");
    }
  };

  const handleRefresh = async () => {
    if (cpf && !cpfError && validateCpfChange(cpf).isCompleted) {
      const response = await fetchRegistrations({ cpf });
      showToast(response);
    } else {
      const response = await fetchRegistrations();
      showToast(response);
    }
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        mask={cpfMask}
        value={cpf}
        name="cpf"
        onChange={handleCpfChange}
        error={cpfError}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefresh}>
          <HiRefresh />
        </IconButton>
        <Button
          onClick={() => goToNewAdmissionPage()}
          aria-label="nova-admissao"
        >
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
