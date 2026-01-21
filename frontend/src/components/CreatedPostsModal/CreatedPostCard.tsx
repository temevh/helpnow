import { Post } from "@/types";
import { HStack, Text } from "@chakra-ui/react";
import { EditButton } from "../common/buttons";

const CreatedPostCard = ({ post }: { post: Post }) => {
  return (
    <HStack>
      <Text>{post.name}</Text>
      <EditButton />
    </HStack>
  );
};

export default CreatedPostCard;
