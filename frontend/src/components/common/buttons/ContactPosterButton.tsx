import { Button } from "@chakra-ui/react";

const ContactPosterButton = () => {
  return (
    <Button
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
      bg="blue.500"
      flex={1}
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
      📩 Contact poster
    </Button>
  );
};

export default ContactPosterButton;
