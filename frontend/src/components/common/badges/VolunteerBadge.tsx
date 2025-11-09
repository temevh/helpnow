import { Badge } from "@chakra-ui/react";

interface VolunteerBadgeProps {
  volunteersAlready: number;
  volunteersNeeded?: number;
}

const VolunteerBadge = ({
  volunteersAlready,
  volunteersNeeded,
}: VolunteerBadgeProps) => {
  return (
    <Badge px={3} py={1} borderRadius="full" fontSize="md" fontWeight="bold">
      {volunteersAlready} / {volunteersNeeded}
    </Badge>
  );
};

export default VolunteerBadge;
