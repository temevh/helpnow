"use client";

import { useState, ReactElement, ChangeEvent } from "react";
import {
  Input,
  Field,
  InputGroup,
  InputElement,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  placeholder: string;
  required?: boolean;
  label?: string;
  helperText?: string;
  icon?: ReactElement;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = ({
  placeholder,
  required = false,
  label,
  helperText,
  icon,
  value,
  onChange,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <Field.Root required={required}>
      {label && (
        <Field.Label>
          {label} {required && <Field.RequiredIndicator />}
        </Field.Label>
      )}

      <HStack>
        <InputGroup
          startElement={icon}
          endElement={
            <IconButton
              variant="ghost"
              size="sm"
              aria-label={show ? "Hide password" : "Show password"}
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </IconButton>
          }
        >
          <Input
            placeholder={placeholder}
            type={show ? "text" : "password"}
            variant="subtle"
            value={value}
            onChange={onChange}
          />
        </InputGroup>
      </HStack>

      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default PasswordInput;
