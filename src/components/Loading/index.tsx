import styled from "styled-components";

const SvgRoot = styled.svg`
  fill: currentColor;
  margin-left: 6px;
`;

export const LoadingDots = () => {
  return (
    <SvgRoot
      width="24"
      height="6"
      viewBox="0 0 120 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="12">
        <animate
          attributeName="r"
          from="12"
          to="12"
          begin="0s"
          dur="1s"
          values="12;7.2;12"
          calcMode="linear"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0s"
          dur="1s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle cx="60" cy="15" r="12" fillOpacity="0.3">
        <animate
          attributeName="r"
          from="12"
          to="12"
          begin="0.25s"
          dur="1s"
          values="12;7.2;12"
          calcMode="linear"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0.25s"
          dur="1s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle cx="105" cy="15" r="12" fillOpacity="0.3">
        <animate
          attributeName="r"
          from="12"
          to="12"
          begin="0.5s"
          dur="1s"
          values="12;7.2;12"
          calcMode="linear"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="fill-opacity"
          from="1"
          to="1"
          begin="0.5s"
          dur="1s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </SvgRoot>
  );
};