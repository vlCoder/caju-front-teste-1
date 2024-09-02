
import { useRegistrationContext } from "~/contexts/ContextRegistre";

import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";

const DashboardPage = () => {

  const { registrations, loading } = useRegistrationContext();

  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={registrations} loading={loading} />
    </S.Container>
  );
};
export default DashboardPage;
