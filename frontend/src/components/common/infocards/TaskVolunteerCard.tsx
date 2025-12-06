import { HStack, Text } from "@chakra-ui/react";
import VolunteerBadge from "../badges/VolunteerBadge";

const TaskVolunteerCard = ({
  volunteersAlready,
  volunteersNeeded,
}: {
  volunteersAlready: number;
  volunteersNeeded: number;
}) => {
  return (
    <HStack p={3} bg="blue.50" borderRadius="lg" justify="space-between">
      <HStack>
        <Text fontSize="lg">🙋‍♂️</Text>
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          Volunteers
        </Text>
      </HStack>

      <VolunteerBadge
        volunteersAlready={volunteersAlready ?? 0}
        volunteersNeeded={volunteersNeeded}
      />
    </HStack>
  );
};

export default TaskVolunteerCard;
