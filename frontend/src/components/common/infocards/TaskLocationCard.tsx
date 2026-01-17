import { HStack, Text } from "@chakra-ui/react";

const TaskLocationCard = ({ locationInfo }: { locationInfo: string }) => {
  const isTime = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/.test(locationInfo);

  return (
    <HStack p={3} bg="blue.50" borderRadius="lg" justify="space-between">
      <HStack>
        <Text fontSize="lg">📍</Text>
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          Location
        </Text>
      </HStack>
      <Text fontWeight="medium" color="gray.800">
        {isTime ? `Revealed at ${locationInfo}` : locationInfo}
      </Text>
    </HStack>
  );
};

export default TaskLocationCard;
