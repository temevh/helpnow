import { Input, Field, InputGroup } from "@chakra-ui/react";
import { ReactElement, ChangeEvent } from "react";

type TextInputProps = {
  placeholder: string;
  required?: boolean;
  label?: string;
  helperText?: string;
  icon?: ReactElement;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  placeholder,
  required = false,
  label,
  helperText,
  icon,
  value,
  onChange,
}: TextInputProps) => {
  return (
    <Field.Root required={required}>
      {label && (
        <Field.Label>
          {label} {required && <Field.RequiredIndicator />}
        </Field.Label>
      )}
      <InputGroup startElement={icon}>
        <Input
          placeholder={placeholder}
          variant={"subtle"}
          value={value}
          onChange={onChange}
        />
      </InputGroup>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default TextInput;
