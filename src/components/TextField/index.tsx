import { InputHTMLAttributes, Ref } from "react";
import MaskedInput from "react-text-mask";
import styled from "styled-components";

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;

const ErrorSpan = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: red;
`;

type Props = {
  label?: string;
  error?: string;
  mask?: (string | RegExp)[];
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ label, error, mask, ...props }: Props) => {
  return (
    <InputDiv>
      <Label htmlFor={props.id}>{label}</Label>
      {mask ? (
        <MaskedInput
          mask={mask}
          {...props}
          render={(ref, inputProps) => (
            <Input ref={ref as Ref<HTMLInputElement>} {...inputProps} />
          )}
        />
      ) : (
        <Input {...props} />
      )}
      {error && <ErrorSpan aria-label="error-message">{error}</ErrorSpan>}
    </InputDiv>
  );
};

export default TextField;
