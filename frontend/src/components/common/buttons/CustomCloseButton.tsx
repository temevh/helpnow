import { Button } from "@chakra-ui/react";

interface CustomCloseButtonProps {
  onClick: () => void;
}

const CustomCloseButton = ({ onClick }: CustomCloseButtonProps) => {
  return (
    <Button
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
      bg="red.500"
      flex={0.5}
      color="white"
      _hover={{
        bg: "red.700",
        transform: "translateY(-1px)",
        boxShadow: "lg",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      transition="all 0.2s ease"
      py={2}
      onClick={onClick}
    >
      ❌ Close
    </Button>
  );
};

export default CustomCloseButton;
