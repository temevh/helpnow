import { Badge, Text } from "@chakra-ui/react";
import { getStatusBadgeColor } from "@/utils";

const StatusBadge = ({ status }: { status: string | undefined }) => {
  return (
    <Badge
      backgroundColor={getStatusBadgeColor(status)}
      px={3}
      py={1}
      borderRadius="full"
      fontSize="sm"
      fontWeight="bold"
    >
      <Text color={"black"}>{status}</Text>
    </Badge>
  );
};

export default StatusBadge;
