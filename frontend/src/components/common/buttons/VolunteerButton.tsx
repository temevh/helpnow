import { Button } from "@chakra-ui/react";

const VolunteerButton = () => {
  return (
    <Button
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
      bg="green.500"
      flex={1}
      color="white"
      _hover={{
        bg: "green.700",
        transform: "translateY(-1px)",
        boxShadow: "lg",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      transition="all 0.2s ease"
      py={2}
    >
      🙋‍♂️ Volunteer!
    </Button>
  );
};

export default VolunteerButton;
