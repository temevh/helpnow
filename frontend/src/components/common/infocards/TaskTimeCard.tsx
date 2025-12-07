import { convertUnixToDate } from "@/utils";
import { HStack, Text } from "@chakra-ui/react";

const TaskTimeCard = ({ time }: { time: string | undefined }) => {
  return (
    <HStack p={3} bg="blue.50" borderRadius="lg" justify="space-between">
      <HStack>
        <Text fontSize="lg">📅</Text>
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          Task Time
        </Text>
      </HStack>
      <Text fontWeight="medium" color="gray.800">
        {time ? convertUnixToDate(time) : "N/A"}
      </Text>
    </HStack>
  );
};

export default TaskTimeCard;
