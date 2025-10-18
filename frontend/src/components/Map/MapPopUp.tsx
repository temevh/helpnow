import { Box, Badge, Text, Separator, HStack } from "@chakra-ui/react";
import { Popup } from "react-leaflet";
import { Post } from "@/types";
import { VolunteerButton, OpenButton } from "../common/buttons";
import { getStatusBadgeColor, convertUnixToDate } from "../../utils";

interface MapPopUpProps {
  post: Post;
}

export const MapPopUp = ({ post }: MapPopUpProps) => {
  return (
    <Popup closeButton={true}>
      <HStack justify="space-between" mb={1}>
        <Text fontWeight="bold" fontSize="md" color="gray.800" noOfLines={1}>
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

      <Text fontSize="sm" color="gray.700" mb={2} noOfLines={3}>
        {post.description || "No description provided."}
      </Text>

      <Text fontSize="xs" color="gray.500" mb={3}>
        📅 {convertUnixToDate(post.taskTime)}
      </Text>

      <HStack gap={2}>
        <OpenButton />
        {post.status === "OPEN" && <VolunteerButton />}
      </HStack>
    </Popup>
  );
};
