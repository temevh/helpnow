import { HStack, Text } from "@chakra-ui/react";

const TaskRewardCard = ({ reward }: { reward: number | null }) => {
  return (
    <HStack
      p={3}
      bg="green.50"
      borderRadius="lg"
      justify="space-between"
      border="1px solid"
      borderColor="green.200"
    >
      <HStack>
        <Text fontSize="lg">💰</Text>
        <Text fontSize="sm" fontWeight="semibold" color="green.700">
          Reward
        </Text>
      </HStack>
      <Text fontWeight="bold" color="green.600" fontSize="lg">
        €{reward}
      </Text>
    </HStack>
  );
};

export default TaskRewardCard;
