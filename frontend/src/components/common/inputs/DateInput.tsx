import { Field, InputGroup } from "@chakra-ui/react";
import { ReactElement } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type DateInputProps = {
  placeholder?: string;
  required?: boolean;
  label?: string;
  helperText?: string;
  icon?: ReactElement;
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const DateInput = ({
  placeholder = "Select date and time",
  required = false,
  label,
  helperText,
  icon,
  value,
  onChange,
}: DateInputProps) => {
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
        <DatePicker
          selected={value}
          onChange={(date) => onChange(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy HH:mm"
          placeholderText={placeholder}
          className="chakra-datepicker"
        />
      </InputGroup>
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      <style jsx global>{`
        .chakra-datepicker {
          width: 100%;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          line-height: 1.5;
          color: #2d3748;
          background-color: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          outline: none;
          transition: all 0.2s;
        }

        .chakra-datepicker:hover {
          border-color: #cbd5e0;
          background-color: white;
        }

        .chakra-datepicker:focus {
          border-color: #90cdf4;
          box-shadow: 0 0 0 1px #90cdf4;
          background-color: white;
        }

        .chakra-datepicker::placeholder {
          color: #a0aec0;
        }

        .react-datepicker-popper {
          z-index: 9999 !important;
        }

        .react-datepicker {
          font-family: inherit;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .react-datepicker__header {
          background-color: #edf2f7;
          border-bottom: 1px solid #e2e8f0;
        }

        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: #2d3748;
          font-weight: 600;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #3182ce;
          color: white;
        }

        .react-datepicker__day:hover {
          background-color: #ebf8ff;
        }

        .react-datepicker__time-container {
          border-left: 1px solid #e2e8f0;
        }

        .react-datepicker__time-list-item--selected {
          background-color: #3182ce !important;
          color: white !important;
        }
      `}</style>
    </Field.Root>
  );
};

export default DateInput;
