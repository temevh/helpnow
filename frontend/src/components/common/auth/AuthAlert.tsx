import { Box, HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AuthAlertProps {
  type: "error" | "success";
  message: string;
  icon: ReactNode;
}

export default function AuthAlert({ type, message, icon }: AuthAlertProps) {
  const colors = {
    error: {
      bg: "red.50",
      border: "red.200",
      text: "red.600",
      iconColor: "red.500",
    },
    success: {
      bg: "green.50",
      border: "green.200",
      text: "green.600",
      iconColor: "green.500",
    },
  };

  const colorScheme = colors[type];

  return (
    <Box
      w="full"
      bg={colorScheme.bg}
      border="1px solid"
      borderColor={colorScheme.border}
      borderRadius="lg"
      p={4}
    >
      <HStack>
        <Box color={colorScheme.iconColor}>{icon}</Box>
        <Text color={colorScheme.text} fontWeight="medium" fontSize="sm">
          {message}
        </Text>
      </HStack>
    </Box>
  );
}
