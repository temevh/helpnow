import { HStack, Text } from "@chakra-ui/react";

const TaskLocationCard = ({ locationInfo }: { locationInfo: string }) => {
  return (
    <HStack p={3} bg="blue.50" borderRadius="lg" justify="space-between">
      <HStack>
        <Text fontSize="lg">📍</Text>
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          Location
        </Text>
      </HStack>
      <Text fontWeight="medium" color="gray.800">
        Revealed at 18:30
      </Text>
    </HStack>
  );
};

export default TaskLocationCard;
