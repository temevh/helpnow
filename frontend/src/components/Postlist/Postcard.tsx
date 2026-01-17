import {
  Text,
  CardRoot,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
} from "@chakra-ui/react";
import { OpenButton, VolunteerButton } from "../common/buttons";
import { Post } from "@/types";
import StatusBadge from "../common/badges/StatusBadge";

interface PostcardProps {
  post: Post;
  onOpenPost: (post: Post) => void;
}

export const Postcard = ({ post, onOpenPost }: PostcardProps) => {
  const isVisible = post.volunteersAlready < post.volunteersNeeded;
  return (
    <CardRoot width="400px" maxW="400px" bg="bg.surface" border="none">
      <CardHeader color="white" p="2">
        <HStack>
          <Text fontWeight="semibold" fontSize="lg" color="fg.default">
            {post.name}
          </Text>
          <StatusBadge status={post.status} />
        </HStack>
      </CardHeader>

      <CardBody p="2">
        <Text
          fontSize="sm"
          color="fg.default"
          bg="gray.400"
          p="2"
          borderRadius="md"
          lineHeight="1.5"
        >
          {post.description || "No description provided."}
        </Text>
      </CardBody>

      <CardFooter p="2" pt="0">
        <HStack w="100%" gap={2}>
          <OpenButton onClick={() => onOpenPost(post)} />
          {isVisible && <VolunteerButton postId={post.id} />}
        </HStack>
      </CardFooter>
    </CardRoot>
  );
};
