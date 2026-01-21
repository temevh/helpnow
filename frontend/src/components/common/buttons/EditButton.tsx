import { Button } from "@chakra-ui/react";

const EditButton = () => {
  return (
    <Button
      colorScheme="blue"
      size="sm"
      w="100%"
      borderRadius="md"
      fontWeight="semibold"
      bg="blue.500"
      color="white"
      _hover={{
        bg: "blue.700",
        transform: "translateY(-1px)",
        boxShadow: "sm",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      transition="all 0.2s ease"
      py={2}
    >
      ⚙ Edit post
    </Button>
  );
};

export default EditButton;
