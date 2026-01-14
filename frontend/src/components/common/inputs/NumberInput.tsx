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
  minNumber?: number;
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
  minNumber = 1,
}: NumberInputProps) => {
  return (
    <Field.Root required={required}>
      {label && (
        <Field.Label
          fontWeight="semibold"
          fontSize="md"
          color="fg.default"
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
          bg="bg.surface"
          borderColor="gray.200"
          min={minNumber}
          color="fg.default"
          _placeholder={{
            color: "fg.muted",
          }}
          _hover={{
            borderColor: "gray.300",
            bg: "bg.surface",
          }}
          _focus={{
            borderColor: "blue.300",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)",
            bg: "bg.surface",
          }}
          _dark={{
            borderColor: "gray.700",
            bg: "bg.surface",
            _hover: {
              borderColor: "gray.600",
            },
          }}
        />
      </InputGroup>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default NumberInput;
