import { Button } from "@chakra-ui/react";

interface CancelVolunteerButtonProps {
  onClick: () => void;
}

const CancelVolunteerButton = ({ onClick }: CancelVolunteerButtonProps) => {
  return (
    <Button
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
      bg="red.500"
      flex={1}
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
      ❌ Cancel volunteering
    </Button>
  );
};

export default CancelVolunteerButton;
