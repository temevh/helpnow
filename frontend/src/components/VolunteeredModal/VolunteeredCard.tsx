import { HStack, Text, VStack, Box, Badge, Separator } from "@chakra-ui/react";
import { convertUnixToDate } from "@/utils";
import { Calendar, User, Coins, Users } from "lucide-react";
import {
  TaskTimeCard,
  TaskDescriptionCard,
  TaskVolunteerCard,
  TaskRewardCard,
} from "../common/infocards";

export const VolunteeredCard = ({ post }) => {
  return (
    <Box p={5} bg="white" borderRadius="xl" border="2px solid">
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

        {post.description && (
          <TaskDescriptionCard description={post.description} />
        )}

        <VStack align="stretch" gap={2}>
          <TaskDescriptionCard description={post?.description} />
          <TaskTimeCard time={post?.taskTime} />
          <TaskVolunteerCard
            volunteersAlready={post?.volunteersAlready}
            volunteersNeeded={post?.volunteersNeeded}
          />

          {post?.reward && post.reward > 0 && (
            <TaskRewardCard reward={post.reward} />
          )}
        </VStack>
      </VStack>
    </Box>
  );
};
