import styled, { keyframes } from "styled-components";

import {
  registrationStatusStyles,
  RegistrationStatus,
} from "~/types/registration";

const placeholderSkeleton = keyframes`
  0% {
    background-position: -800px 0;
  }
  100% {
    background-position: 800px 0;
  }
`;

export const Card = styled.div`
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

export const CardEmptyMessage = styled.div<{
  $status: RegistrationStatus;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ $status }) => registrationStatusStyles[$status].title};
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  p {
    text-align: center;
    font-size: 0.875rem;
  }
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  > * {
    flex: 1;
  }

  svg {
    cursor: pointer;
    flex: initial;
    margin-left: 8px;
  }
`;

export const Skeleton = styled.h3<{ height?: string }>`
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  position: relative;
  background-repeat: no-repeat;
  background-size: 800px 104px;
  ${({ height }) => height && `height: ${height};`}
  display: block;
  width: 100%;
  border-radius: 8px;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${placeholderSkeleton};
  animation-timing-function: linear;
  :after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;