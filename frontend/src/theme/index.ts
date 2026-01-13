import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Export color constants for use in utility functions
export const colors = {
  brand: {
    orange: "#FF6B35",
    lightOrange: "#FFA07A",
    darkOrange: "#E55A2B",
  },
  status: {
    open: "#38A169", // green.500
    accepted: "#ECC94B", // yellow.400
    completed: "#3182CE", // teal.600
    closed: "#E53E3E", // red.600
    filled: "#FF6B35", // brand orange
    default: "#A0AEC0", // gray.400
  },
};

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Define your custom colors here
        brand: {
          orange: { value: colors.brand.orange },
          lightOrange: { value: colors.brand.lightOrange },
          darkOrange: { value: colors.brand.darkOrange },
        },
        // Status colors for posts
        status: {
          open: { value: colors.status.open },
          accepted: { value: colors.status.accepted },
          completed: { value: colors.status.completed },
          closed: { value: colors.status.closed },
          filled: { value: colors.status.filled },
          default: { value: colors.status.default },
        },
        // You can add more custom colors
        primary: {
          50: { value: "#E6F2FF" },
          100: { value: "#BAE0FF" },
          200: { value: "#8DCFFF" },
          500: { value: "#0078FF" },
          700: { value: "#0056B3" },
          900: { value: "#003A75" },
        },
      },
    },
    semanticTokens: {
      colors: {
        // Semantic tokens that can adapt to light/dark mode
        "brand.solid": {
          value: {
            base: "{colors.brand.orange}",
            _dark: "{colors.brand.lightOrange}",
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
