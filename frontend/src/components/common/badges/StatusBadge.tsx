import { Badge, Text } from "@chakra-ui/react";
import { getStatusColor } from "@/utils";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      backgroundColor={getStatusColor(status)}
      px={3}
      py={1}
      borderRadius="full"
      fontSize="sm"
      fontWeight="bold"
    >
      <Text color={"white"}>{status}</Text>
    </Badge>
  );
};

export default StatusBadge;
