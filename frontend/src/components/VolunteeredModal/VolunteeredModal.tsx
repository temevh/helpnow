import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogBackdrop,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CustomCloseButton } from "../common/buttons";
import { CANCEL_VOLUNTEER } from "@/graphql/mutations/post";
import { GET_VOLUNTEERED_POSTS } from "@/graphql/queries/post";
import { Post, User } from "@/types";
import { VolunteeredCard } from "./VolunteeredCard";
import { useMutation, useQuery } from "@apollo/client/react";
import { useToast } from "@/hooks/useToast";
import { useEffect } from "react";

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
    <DialogRoot
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      placement="center"
      closeOnEscape
    >
      <DialogBackdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <DialogContent
        maxW="3xl"
        maxH="85vh"
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        border="3px solid"
        borderColor="blue.200"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={1000}
      >
        <DialogCloseTrigger
          top={4}
          right={4}
          bg="white"
          borderRadius="full"
          _hover={{ bg: "blue.100" }}
        />

        <DialogHeader
          bgGradient="linear(to-r, blue.400, blue.500)"
          color="white"
          borderTopRadius="2xl"
          p={6}
        >
          <HStack justify="space-between" align="center" w={"100%"}>
            <Text fontSize="2xl" fontWeight="bold" color={"black"}>
              Your volunteers
            </Text>
            <CustomCloseButton onClick={() => onOpenChange(false)} />
          </HStack>
        </DialogHeader>

        <DialogBody
          px={6}
          bg="white"
          overflowY="auto"
          maxH="calc(85vh - 200px)"
          css={{
            "&::-webkit-scrollbar": {
              width: "0px",
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <VStack gap={2} align="stretch">
            {data?.getVolunteeredPosts &&
            data.getVolunteeredPosts.length > 0 ? (
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
        </DialogBody>

        <DialogFooter
          bg="blue.50"
          borderBottomRadius="2xl"
          p={4}
          gap={3}
        ></DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
