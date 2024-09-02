import { LoadingDots } from "~/components/Loading";
import { Registration, RegistrationStatus } from "~/types/registration";

import * as S from "./styles";
import RegistrationCard, {
  EmptyStateRegistrationCard,
} from "../RegistrationCard";

interface ColumnProps {
  status: RegistrationStatus;
  title: string;
  ariaLabel?: string;
}

const allColumns: ColumnProps[] = [
  {
    status: RegistrationStatus.REVIEW,
    title: "Pronto para revisar",
    ariaLabel: "review",
  },
  {
    status: RegistrationStatus.APPROVED,
    title: "Aprovado",
    ariaLabel: "approved",
  },
  {
    status: RegistrationStatus.REPROVED,
    title: "Reprovado",
    ariaLabel: "reproved",
  },
];

const filterByStatus = (status: RegistrationStatus) => {
  return (registration: Registration) => {
    return registration.status === status;
  };
};

type Props = {
  registrations?: Registration[];
  loading?: boolean;
};

const Collumns = ({ registrations, loading = false }: Props) => {
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column
            $status={collum.status}
            key={collum.title}
            aria-label={collum.ariaLabel}
          >
            <>
              <S.TitleColumn $status={collum.status}>
                {collum.title}
                {loading && <LoadingDots />}
              </S.TitleColumn>
              <S.CollumContent>
                {loading === true && <RegistrationCard isLoading={loading} />}
                {loading === false &&
                  registrations?.filter(filterByStatus(collum.status))
                    .length === 0 && (
                    <EmptyStateRegistrationCard status={collum.status} />
                  )}
                {loading === false &&
                  registrations
                    ?.filter(filterByStatus(collum.status))
                    .map((registration) => {
                      return (
                        <RegistrationCard
                          data={registration}
                          key={registration.id}
                        />
                      );
                    })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;