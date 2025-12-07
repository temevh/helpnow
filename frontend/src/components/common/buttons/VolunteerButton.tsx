import { useUser } from "@/hooks/useUser";
import { Button } from "@chakra-ui/react";
import { GET_POSTS } from "@/graphql/queries/post";
import { VOLUNTEER_POST } from "@/graphql/mutations/post";
import { useMutation } from "@apollo/client/react";
import { useToast } from "@/hooks/useToast";
import { User } from "@/types";

interface VolunteerButtonProps {
  postId?: string;
}

const VolunteerButton = ({ postId }: VolunteerButtonProps) => {
  const { user } = useUser();
  const { showToast } = useToast();
  const [volunteerPost] = useMutation(VOLUNTEER_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log("Successfully volunteered:", data);
      showToast({ message: "Succesfully saved volunteering", type: "success" });
    },
    onError: (error) => {
      console.error("Error volunteering:", error);
      showToast({ message: "Failure volunteering", type: "error" });
    },
  });

  if (!user) return null;

  const onClick = () => {
    const userId = (user as User)?.id;

    if (!userId || !postId) {
      console.error("Missing user ID or post ID");
      return;
    }

    console.log("volunteering user", userId, "for post", postId);
    volunteerPost({
      variables: { userId, postId },
    });
  };

  return (
    <Button
      colorScheme="blue"
      size="sm"
      borderRadius="md"
      fontWeight="semibold"
      bg="green.500"
      flex={1}
      color="white"
      visibility={user ? "visible" : "hidden"}
      _hover={{
        bg: "green.700",
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
      🙋‍♂️ Volunteer!
    </Button>
  );
};

export default VolunteerButton;
