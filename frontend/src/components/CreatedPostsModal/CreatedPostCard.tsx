import { Post } from "@/types";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { DeleteButton, EditButton } from "../common/buttons";
import StatusBadge from "../common/badges/StatusBadge";
import VolunteerBadge from "../common/badges/VolunteerBadge";
import { convertUnixToDate } from "@/utils";

const CreatedPostCard = ({ post }: { post: Post }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
    >
      <VStack align="stretch" gap={3}>
        <HStack justify="space-between" align="start">
          <Text fontSize="lg" fontWeight="bold" flex={1} color="fg.default">
            {post.name}
          </Text>
          <StatusBadge status={post.status} />
        </HStack>

        {post.description && (
          <Text fontSize="sm" color="gray.600">
            {post.description}
          </Text>
        )}

        <VStack align="stretch" gap={2} fontSize="sm">
          <HStack justify="space-between">
            <Text color="fg.default">📍 Location:</Text>
            <Text fontWeight="medium" color="fg.default">
              {post.address}
            </Text>
          </HStack>

          <HStack justify="space-between">
            <Text color="fg.default">📅 Task Time:</Text>
            <Text fontWeight="medium" color="fg.default">
              {convertUnixToDate(post.taskTime)}
            </Text>
          </HStack>

          <HStack justify="space-between">
            <Text color="fg.default">👥 Volunteers:</Text>
            <VolunteerBadge
              volunteersAlready={post.volunteersAlready}
              volunteersNeeded={post.volunteersNeeded}
            />
          </HStack>

          <HStack justify="space-between">
            <Text color="fg.default">Created:</Text>
            <Text fontWeight="medium" fontSize="xs" color="fg.default">
              {convertUnixToDate(post.createdAt)}
            </Text>
          </HStack>
        </VStack>

        <HStack justify="flex-end" pt={2}>
          <DeleteButton />
          <EditButton />
        </HStack>
      </VStack>
    </Box>
  );
};

export default CreatedPostCard;
