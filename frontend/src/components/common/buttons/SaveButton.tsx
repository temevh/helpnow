import { Button } from "@chakra-ui/react";

const SaveButton = ({
  saveClicked,
  disabled,
}: {
  saveClicked: () => void;
  disabled: boolean;
}) => {
  return (
    <Button
      disabled={disabled}
      colorScheme="blue"
      size="sm"
      w="100%"
      borderRadius="md"
      fontWeight="semibold"
      bg="green.500"
      color="white"
      _hover={{
        bg: "green.700",
        transform: "translateY(-1px)",
        boxShadow: "sm",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      transition="all 0.2s ease"
      py={2}
      onClick={saveClicked}
    >
      💾 Create post!
    </Button>
  );
};

export default SaveButton;
