import { Text, VStack } from "@chakra-ui/react";
import { CANCEL_VOLUNTEER } from "@/graphql/mutations/post";
import { GET_VOLUNTEERED_POSTS } from "@/graphql/queries/post";
import { Post, User } from "@/types";
import { VolunteeredCard } from "./VolunteeredCard";
import { useMutation, useQuery } from "@apollo/client/react";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";
import { BasicModal } from "../common/modals/BasicModal";

interface VolunteeredPostsData {
  getVolunteeredPosts: Array<{
    id: string;
    post: Post;
  }>;
}

interface VolunteeredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export const VolunteeredModal = ({
  open,
  onOpenChange,
  user,
}: VolunteeredModalProps) => {
  const { showToast } = useToast();
  const { data, loading, refetch } = useQuery<VolunteeredPostsData>(
    GET_VOLUNTEERED_POSTS,
    {
      variables: { userId: user?.id },
      skip: !user?.id,
    }
  );
  const [cancelVolunteer] = useMutation(CANCEL_VOLUNTEER, {
    refetchQueries: [
      {
        query: GET_VOLUNTEERED_POSTS,
        variables: { userId: user?.id },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      showToast({
        message: "Succesfully cancelled volunteering",
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
      console.log(data);
    }
  }, [open, user?.id, data, refetch]);

  const cancelClicked = (postId: string) => {
    console.log("cancel post", postId, "for user", user);
    const userId = user.id;
    cancelVolunteer({
      variables: { postId, userId },
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <BasicModal
      open={open}
      onOpenChange={onOpenChange}
      header="Your volunteers"
    >
      <VStack gap={2} align="stretch">
        {data?.getVolunteeredPosts && data.getVolunteeredPosts.length > 0 ? (
          data.getVolunteeredPosts.map((volunteerData) => {
            return (
              <VolunteeredCard
                key={volunteerData.id}
                post={volunteerData.post as Post}
                cancelClicked={cancelClicked}
              />
            );
          })
        ) : (
          <Text fontSize="lg" color="gray.600" textAlign="center" py={8}>
            No volunteers yet!
          </Text>
        )}
      </VStack>
    </BasicModal>
  );
};
