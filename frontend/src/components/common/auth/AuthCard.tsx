import { Box, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AuthCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({
  icon,
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      bg="gray.50"
    >
      <Box
        w="full"
        maxW="md"
        bg="white"
        borderRadius="xl"
        border="1px solid"
        borderColor="gray.200"
        shadow="sm"
        overflow="hidden"
      >
        <Box
          py={8}
          px={6}
          textAlign="center"
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <VStack gap={3}>
            <Box
              p={3}
              bg="teal.50"
              borderRadius="full"
              display="inline-flex"
              color="teal.600"
            >
              {icon}
            </Box>
            <VStack gap={1}>
              <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                {title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {subtitle}
              </Text>
            </VStack>
          </VStack>
        </Box>

        <Box p={8}>{children}</Box>
      </Box>
    </Box>
  );
}
