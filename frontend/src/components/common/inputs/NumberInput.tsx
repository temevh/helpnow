import { Input, Field, InputGroup } from "@chakra-ui/react";
import { ReactElement, ChangeEvent } from "react";

type NumberInputProps = {
  placeholder: string;
  required?: boolean;
  label?: string;
  helperText?: string;
  icon?: ReactElement;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  bigText?: boolean;
  rows?: number;
};

const NumberInput = ({
  placeholder,
  required = false,
  label,
  helperText,
  icon,
  value,
  onChange,
  type = "number",
}: NumberInputProps) => {
  return (
    <Field.Root required={required}>
      {label && (
        <Field.Label
          fontWeight="semibold"
          fontSize="md"
          color="gray.700"
          mb={2}
        >
          {label} {required && <Field.RequiredIndicator />}
        </Field.Label>
      )}

      <InputGroup startElement={icon}>
        <Input
          placeholder={placeholder}
          variant="outline"
          value={value}
          onChange={onChange}
          type={type}
          bg="gray.50"
          borderColor="gray.200"
          color="gray.700"
          _placeholder={{
            color: "gray.400",
          }}
          _hover={{
            borderColor: "gray.300",
            bg: "white",
          }}
          _focus={{
            borderColor: "blue.300",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)",
            bg: "white",
          }}
        />
      </InputGroup>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default NumberInput;
