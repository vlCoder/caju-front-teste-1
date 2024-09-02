import styled from "styled-components";

import {
  RegistrationStatus,
  registrationStatusStyles,
} from "~/types/registration";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Column = styled.div<{ $status: RegistrationStatus }>`
  height: auto;
  background-color: ${({ $status }) =>
    registrationStatusStyles[$status].background};
  border-radius: 32px;
  max-height: 80vh;
  @media (min-width: 1024px) {
    min-height: 80vh;
  }
`;

export const TitleColumn = styled.h3<{ $status: RegistrationStatus }>`
  margin: 0px;
  color: ${({ $status }) => registrationStatusStyles[$status].title};
  margin: 24px;
`;

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;

export const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 4px solid #fff;
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  h3,
  p {
    margin: 0;
  }
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
`;
