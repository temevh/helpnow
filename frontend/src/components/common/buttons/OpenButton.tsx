import { Button } from "@chakra-ui/react";

interface OpenButtonProps {
  onClick: () => void;
}

const OpenButton = ({ onClick }: OpenButtonProps) => {
  return (
    <Button
      onClick={onClick}
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
      flex={1}
      bg="blue.500"
      color="white"
      _hover={{
        bg: "blue.700",
        transform: "translateY(-1px)",
        boxShadow: "lg",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      transition="all 0.2s ease"
      py={2}
    >
      👀 Open!
    </Button>
  );
};

export default OpenButton;
