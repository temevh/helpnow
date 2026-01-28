import { Button, HStack, Text } from "@chakra-ui/react";
import { Settings } from "lucide-react";

const EditButton = ({ onClick }: { onClick: () => void }) => {
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
        boxShadow: "sm",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      transition="all 0.2s ease"
      py={2}
      onClick={onClick}
    >
      <HStack>
        <Settings />
        <Text>Edit post</Text>
      </HStack>
    </Button>
  );
};

export default EditButton;
