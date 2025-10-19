import { Input, Field, InputGroup } from "@chakra-ui/react";
import { ReactElement } from "react";

type TextInputProps = {
  placeholder: string;
  required?: boolean;
  label?: string;
  helperText?: string;
  icon?: ReactElement;
};

const TextInput = ({
  placeholder,
  required = false,
  label,
  helperText,
  icon,
}: TextInputProps) => {
  return (
    <Field.Root required={required}>
      {label && (
        <Field.Label>
          {label} {required && <Field.RequiredIndicator />}
        </Field.Label>
      )}
      <InputGroup startElement={icon}>
        <Input placeholder={placeholder} variant={"subtle"} />
      </InputGroup>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default TextInput;
