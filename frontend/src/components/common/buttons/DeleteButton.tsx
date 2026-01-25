import { Button, HStack, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";

const DeleteButton = () => {
  return (
    <Button
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
      bg="red.500"
      color="white"
      _hover={{
        bg: "red.700",
        transform: "translateY(-1px)",
        boxShadow: "sm",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      transition="all 0.2s ease"
      py={2}
    >
      <HStack>
        <Trash2 />
        <Text>Delete post</Text>
      </HStack>
    </Button>
  );
};

export default DeleteButton;
