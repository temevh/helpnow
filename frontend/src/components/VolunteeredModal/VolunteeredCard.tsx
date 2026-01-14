import { HStack, Text, VStack, Box } from "@chakra-ui/react";
import {
  TaskTimeCard,
  TaskDescriptionCard,
  TaskRewardCard,
  TaskVolunteerCard,
} from "../common/infocards";
import { CancelVolunteerButton, ContactPosterButton } from "../common/buttons";
import { Post } from "@/types";

export const VolunteeredCard = ({
  post,
  cancelClicked,
}: {
  post: Post;
  cancelClicked: (postId: string) => void;
}) => {
  return (
    <Box p={5} bg="gray.200" borderRadius="xl" border="2px solid">
      <VStack align="stretch" gap={3} mt={1}>
        <HStack justify="space-between" align="start">
          <Text fontSize="xl" fontWeight="bold" flex={1} lineHeight="1.3">
            {post.name}
          </Text>
        </HStack>

        <VStack align="stretch" gap={2}>
          <TaskDescriptionCard
            description={post.description ?? null}
            hideHeader={true}
          />
          <HStack>
            <TaskTimeCard time={post.taskTime} />

            {post?.reward && post.reward > 0 && (
              <TaskRewardCard reward={post.reward} />
            )}
            <TaskVolunteerCard
              volunteersAlready={post.volunteersAlready}
              volunteersNeeded={post.volunteersNeeded}
            />
          </HStack>
        </VStack>
        <HStack>
          <CancelVolunteerButton onClick={() => cancelClicked(post.id)} />
          <ContactPosterButton />
        </HStack>
      </VStack>
    </Box>
  );
};
