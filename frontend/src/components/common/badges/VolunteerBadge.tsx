import { Badge } from "@chakra-ui/react";

interface VolunteerBadgeProps {
  currentVolunteers: number;
  volunteerAmount?: number;
}

const VolunteerBadge = ({
  currentVolunteers,
  volunteerAmount,
}: VolunteerBadgeProps) => {
  return (
    <Badge px={3} py={1} borderRadius="full" fontSize="md" fontWeight="bold">
      {currentVolunteers} / {volunteerAmount}
    </Badge>
  );
};

export default VolunteerBadge;
