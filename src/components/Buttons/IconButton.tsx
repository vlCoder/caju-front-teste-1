import { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

export const _IconButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isRotating",
})<{ isRotating: boolean }>`
  cursor: pointer;
  border: 2px solid #64a98c;
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  pointer-events: ${({ isRotating }) => (isRotating ? "none" : "auto")};
  svg {
    color: #64a98c;
    ${({ isRotating }) =>
      isRotating &&
      css`
        animation: ${rotate} 1s linear;
      `}
  }
`;

type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = (props: IconButtonProps) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsRotating(true);
    props.onClick?.(e);
  };

  return (
    <_IconButtonStyled
      {...props}
      isRotating={isRotating}
      onAnimationEnd={() => setIsRotating(false)}
      onClick={handleClick}
    >
      {props.children}
    </_IconButtonStyled>
  );
};
