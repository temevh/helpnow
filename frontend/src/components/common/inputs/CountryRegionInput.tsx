import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Field, HStack, Box } from "@chakra-ui/react";

interface CountryRegionInputProps {
  countryValue?: string;
  regionValue?: string;
  onCountryChange?: (country: string) => void;
  onRegionChange?: (region: string) => void;
  required?: boolean;
}

const CountryRegionInput = ({
  countryValue = "",
  regionValue = "",
  onCountryChange,
  onRegionChange,
  required = false,
}: CountryRegionInputProps) => {
  const [country, setCountry] = useState(countryValue);
  const [region, setRegion] = useState(regionValue);

  const onChangeCountry = (val: string) => {
    setCountry(val);
    if (!val) {
      setRegion("");
      onRegionChange?.("");
    }
    onCountryChange?.(val);
  };

  const onChangeRegion = (val: string) => {
    setRegion(val);
    onRegionChange?.(val);
  };

  const dropdownStyles = {
    width: "100%",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "var(--chakra-colors-fg-default)",
    backgroundColor: "var(--chakra-colors-bg-surface)",
    border: "1px solid var(--chakra-colors-gray-200)",
    borderRadius: "0.375rem",
    outline: "none",
    transition: "all 0.2s",
    cursor: "pointer",
  };

  return (
    <Field.Root required={required}>
      <Field.Label fontWeight="semibold" fontSize="md" color="fg.default" mb={2}>
        Location {required && <Field.RequiredIndicator />}
      </Field.Label>
      <HStack gap={4} align="stretch">
        <Box flex={1}>
          <CountryDropdown
            value={country}
            onChange={onChangeCountry}
            defaultOptionLabel="Select country"
            style={dropdownStyles}
          />
        </Box>
        <Box flex={1}>
          <RegionDropdown
            country={country}
            value={region}
            onChange={onChangeRegion}
            defaultOptionLabel={
              country ? "Select region" : "Select country first"
            }
            disabled={!country}
            style={{
              ...dropdownStyles,
              opacity: !country ? 0.4 : 1,
              cursor: !country ? "not-allowed" : "pointer",
              backgroundColor: !country
                ? "var(--chakra-colors-gray-100)"
                : "var(--chakra-colors-bg-surface)",
            }}
          />
        </Box>
      </HStack>
    </Field.Root>
  );
};

export default CountryRegionInput;
