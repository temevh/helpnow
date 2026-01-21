import { VStack } from "@chakra-ui/react";
import { BasicModal } from "../common/modals/BasicModal";
import { useQuery } from "@apollo/client/react";
import { Post, User } from "@/types";
import { GET_CREATED_POSTS } from "@/graphql/queries/post";
import { useEffect } from "react";

interface CreatedPostsData {
  getCreatedPosts: Array<{
    id: string;
    post: Post;
  }>;
}

interface CreatedPostsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export const CreatedPostsModal = ({
  open,
  onOpenChange,
  user,
}: CreatedPostsModalProps) => {
  const { data, loading, refetch } = useQuery<CreatedPostsData>(
    GET_CREATED_POSTS,
    {
      variables: { userId: user?.id },
      skip: !user?.id,
    },
  );

  useEffect(() => {
    if (open && user?.id) {
      refetch({ userId: user.id });
    }
  }, [open, user?.id, data, refetch]);

  console.log("users posts", data);
  return (
    <BasicModal open={open} onOpenChange={onOpenChange} header="Your posts">
      <VStack gap={2} align="stretch"></VStack>
    </BasicModal>
  );
};
