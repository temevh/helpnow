import { HStack, Text, VStack, Box, Badge, Separator } from "@chakra-ui/react";

import {
  TaskTimeCard,
  TaskDescriptionCard,
  TaskRewardCard,
} from "../common/infocards";
import { CancelVolunteerButton, ContactPosterButton } from "../common/buttons";

export const VolunteeredCard = ({ post }) => {
  return (
    <Box p={5} bg="gray.200" borderRadius="xl" border="2px solid">
      <VStack align="stretch" gap={3} mt={1}>
        <HStack justify="space-between" align="start">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            flex={1}
            lineHeight="1.3"
          >
            {post.name}
          </Text>
        </HStack>

        <VStack align="stretch" gap={2}>
          <TaskDescriptionCard description={post?.description} />
          <TaskTimeCard time={post?.taskTime} />

          {post?.reward && post.reward > 0 && (
            <TaskRewardCard reward={post.reward} />
          )}
        </VStack>
        <HStack>
          <CancelVolunteerButton onClick={() => {}} />
          <ContactPosterButton />
        </HStack>
      </VStack>
    </Box>
  );
};
