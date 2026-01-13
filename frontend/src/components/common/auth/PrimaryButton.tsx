import { Button, ButtonProps } from "@chakra-ui/react";

interface PrimaryButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export default function PrimaryButton({
  children,
  isLoading,
  loadingText,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      w="full"
      size="lg"
      bg="teal.600"
      color="white"
      _hover={{
        bg: "teal.700",
        transform: "translateY(-1px)",
        shadow: "md",
      }}
      _active={{
        transform: "translateY(0)",
        bg: "teal.800",
      }}
      loading={isLoading}
      loadingText={loadingText}
      transition="all 0.2s ease"
      fontWeight="semibold"
      fontSize="md"
      py={6}
      borderRadius="lg"
      {...props}
    >
      {children}
    </Button>
  );
}
