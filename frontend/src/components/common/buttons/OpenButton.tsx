import { Button } from "@chakra-ui/react";

const OpenButton = () => {
  return (
    <Button
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
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
