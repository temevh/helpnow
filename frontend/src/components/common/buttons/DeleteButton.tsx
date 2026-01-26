import { Button, ButtonProps, HStack, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { forwardRef } from "react";

interface DeleteButtonProps extends ButtonProps {
  deletePost?: () => void;
}

const DeleteButton = forwardRef<HTMLButtonElement, DeleteButtonProps>(
  ({ deletePost, ...props }, ref) => {
    return (
      <Button
        ref={ref}
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
        onClick={deletePost}
        {...props}
      >
        <HStack>
          <Trash2 />
          <Text>Delete post</Text>
        </HStack>
      </Button>
    );
  }
);

DeleteButton.displayName = "DeleteButton";

export default DeleteButton;
