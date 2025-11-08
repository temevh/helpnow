import { Badge, Text, Separator, HStack } from "@chakra-ui/react";
import { Popup } from "react-leaflet";
import { Post } from "@/types";
import { VolunteerButton } from "../common/buttons";
import { getStatusBadgeColor, convertUnixToDate } from "../../utils";
import VolunteerBadge from "../common/badges/VolunteerBadge";
import { useUser } from "@/hooks/useUser";

interface MapPopUpProps {
  post: Post;
}

export const MapPopUp = ({ post }: MapPopUpProps) => {
  const currentVolunteers = 0;
  const { user } = useUser();

  return (
    <Popup closeButton={true}>
      <HStack justify="space-between" mb={1}>
        <Text fontWeight="bold" fontSize="md" color="gray.800">
          {post.name}
        </Text>
        <Badge
          backgroundColor={getStatusBadgeColor(post.status)}
          color="white"
          borderRadius="md"
          px={2}
          py={0.5}
          fontSize="xs"
        >
          {post.status}
        </Badge>
      </HStack>

      <Separator mb={2} />

      <Text fontSize="md" color="gray.700" mb={2}>
        {post.description || "No description provided."}
      </Text>

      <Text fontSize="md" color="gray.500" mb={1}>
        📅 {convertUnixToDate(post.taskTime)}
      </Text>

      <HStack mb={1}>
        <HStack>
          <Text fontSize="sm">🙋‍♂️</Text>
          <Text fontSize="sm" fontWeight="semibold" color="gray.600">
            Volunteers
          </Text>
        </HStack>

        <VolunteerBadge
          currentVolunteers={currentVolunteers}
          volunteerAmount={post?.volunteerAmount}
        />
      </HStack>

      <HStack gap={2}>
        {/*<OpenButton onClick={() => onOpenPost(post)} />*/}
        {user && post.status === "OPEN" && <VolunteerButton />}
      </HStack>
    </Popup>
  );
};
