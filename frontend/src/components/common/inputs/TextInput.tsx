import { Input, Field, InputGroup, Textarea } from "@chakra-ui/react";
import { ReactElement, ChangeEvent } from "react";

type TextInputProps = {
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

const TextInput = ({
  placeholder,
  required = false,
  label,
  helperText,
  icon,
  value,
  onChange,
  bigText = false,
  rows = 4,
  type = "text",
}: TextInputProps) => {
  const sharedStyles = {
    bg: "gray.50",
    borderColor: "gray.200",
    color: "gray.700",
    _placeholder: {
      color: "gray.400",
    },
    _hover: {
      borderColor: "gray.300",
      bg: "white",
    },
    _focus: {
      borderColor: "blue.300",
      boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)",
      bg: "white",
    },
  };

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
      {bigText ? (
        <Textarea
          placeholder={placeholder}
          variant="outline"
          value={value}
          onChange={onChange}
          rows={rows}
          resize="vertical"
          {...sharedStyles}
        />
      ) : (
        <InputGroup startElement={icon}>
          <Input
            placeholder={placeholder}
            variant="outline"
            value={value}
            onChange={onChange}
            type={type}
            {...sharedStyles}
          />
        </InputGroup>
      )}
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default TextInput;
