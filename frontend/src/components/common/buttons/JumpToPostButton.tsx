import { Button } from "@chakra-ui/react";
import { useMapControl } from "@/contexts/MapContext";

interface JumpToPostButtonProps {
  postId?: string;
}

const JumpToPostButton = ({ postId }: JumpToPostButtonProps) => {
  const { jumpToPost } = useMapControl();

  const onClick = () => {
    if (postId) {
      jumpToPost(postId);
    }
  };

  return (
    <Button
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
      bg="yellow.500"
      flex={1}
      color="white"
      _hover={{
        bg: "yellow.700",
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
      🔎 Show post on map
    </Button>
  );
};

export default JumpToPostButton;
