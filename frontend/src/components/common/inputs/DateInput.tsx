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
          color="fg.default"
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
          color: var(--chakra-colors-fg-default);
          background-color: var(--chakra-colors-bg-surface);
          border: 1px solid var(--chakra-colors-gray-200);
          border-radius: 0.375rem;
          outline: none;
          transition: all 0.2s;
        }

        .chakra-datepicker:hover {
          border-color: var(--chakra-colors-gray-300);
          background-color: var(--chakra-colors-bg-surface);
        }

        .chakra-datepicker:focus {
          border-color: var(--chakra-colors-blue-300);
          box-shadow: 0 0 0 1px var(--chakra-colors-blue-300);
          background-color: var(--chakra-colors-bg-surface);
        }

        .chakra-datepicker::placeholder {
          color: var(--chakra-colors-fg-muted);
        }

        .react-datepicker-popper {
          z-index: 9999 !important;
        }

        .react-datepicker {
          font-family: inherit;
          border: 1px solid var(--chakra-colors-gray-200);
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          background-color: var(--chakra-colors-bg-surface);
          color: var(--chakra-colors-fg-default);
        }

        .react-datepicker__header {
          background-color: var(--chakra-colors-gray-100);
          border-bottom: 1px solid var(--chakra-colors-gray-200);
        }

        [data-theme="dark"] .react-datepicker__header {
          background-color: var(--chakra-colors-gray-800);
          border-bottom: 1px solid var(--chakra-colors-gray-700);
        }

        .react-datepicker__current-month,
        .react-datepicker__day-name,
        .react-datepicker__day {
          color: var(--chakra-colors-fg-default);
        }

        .react-datepicker__day:hover {
          background-color: var(--chakra-colors-gray-100);
        }

        [data-theme="dark"] .react-datepicker__day:hover {
          background-color: var(--chakra-colors-gray-700);
        }

        .react-datepicker__time-container {
          border-left: 1px solid var(--chakra-colors-gray-200);
          background-color: var(--chakra-colors-bg-surface);
        }

        .react-datepicker__time-list-item {
          color: var(--chakra-colors-fg-default);
          background-color: var(--chakra-colors-bg-surface) !important;
        }

        .react-datepicker__time-list-item:hover {
          background-color: var(--chakra-colors-gray-100) !important;
        }

        [data-theme="dark"] .react-datepicker__time-list-item:hover {
          background-color: var(--chakra-colors-gray-700) !important;
        }

        .react-datepicker__current-month,
        .react-datepicker__day-name {
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
