import { VStack } from "@chakra-ui/react";
import { BasicModal } from "../common/modals/BasicModal";
import { useQuery, useMutation } from "@apollo/client/react";
import { Post, User } from "@/types";
import { GET_CREATED_POSTS } from "@/graphql/queries/post";
import { DELETE_POST } from "@/graphql/mutations/post";
import { useEffect } from "react";
import CreatedPostCard from "./CreatedPostCard";
import { useToast } from "@/hooks/useToast";

interface CreatedPostsData {
  getCreatedPosts: Post[];
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
  const { showToast } = useToast();

  const { data, loading, refetch } = useQuery<CreatedPostsData>(
    GET_CREATED_POSTS,
    {
      variables: { userId: user?.id },
      skip: !user?.id,
    },
  );

  const [deletePostMutation] = useMutation(DELETE_POST, {
    refetchQueries: [
      {
        query: GET_CREATED_POSTS,
        variables: { userId: user?.id },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      showToast({
        message: "Succesfully deleted post",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Error canceling volunteering:", error);
      showToast({ message: "Failure canceling volunteering", type: "error" });
    },
  });

  useEffect(() => {
    if (open && user?.id) {
      refetch({ userId: user.id });
    }
  }, [open, user?.id, data, refetch]);

  const deletePost = (postId: string) => {
    deletePostMutation({ variables: { postId, userId: user.id } });
  };

  console.log("users posts", data);
  return (
    <BasicModal open={open} onOpenChange={onOpenChange} header="Your posts">
      <VStack gap={2} align="stretch">
        {data?.getCreatedPosts ? (
          data.getCreatedPosts.map((post) => {
            return (
              <CreatedPostCard
                key={post.id}
                post={post}
                deletePost={deletePost}
              />
            );
          })
        ) : (
          <p>You have no posts created</p>
        )}
      </VStack>
    </BasicModal>
  );
};
