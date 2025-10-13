import {
  Box,
  VStack,
  Text,
  Button,
  Badge,
  HStack,
  Separator,
} from "@chakra-ui/react";
import { Popup } from "react-leaflet";
import { Post } from "@/types";

interface MapPopUpProps {
  post: Post;
}

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "green";
    case "ACCEPTED":
      return "yellow";
    case "COMPLETED":
      return "blue";
    case "CLOSED":
      return "red";
    default:
      return "gray";
  }
};

export const MapPopUp = ({ post }: MapPopUpProps) => {
  return (
    <Popup closeButton={true}>
      <div className="flex flex-row items-center justify-between mb-2">
        <h1 className="text-lg font-bold text-gray-800 flex-1 mr-2">
          {post.name}
        </h1>
        <Badge
          backgroundColor={getStatusBadgeColor(post.status)}
          borderRadius="md"
          color="white"
          fontWeight="bold"
          px={3}
          py={1}
          ml={2}
        >
          {post.status}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mb-2 leading-relaxed">
        {post.description}
      </p>
      <p className="text-xs text-gray-500 mb-3">{post.taskTime}</p>
      {post.status === "OPEN" && (
        <Button
          colorScheme="blue"
          size="sm"
          w="full"
          borderRadius="md"
          fontWeight="semibold"
          bg="blue.500"
          color="white"
          _hover={{
            bg: "blue.600",
            transform: "translateY(-1px)",
            boxShadow: "lg",
          }}
          _active={{
            transform: "translateY(0)",
          }}
          transition="all 0.2s ease"
          py={2}
        >
          🙋‍♂️ Volunteer!
        </Button>
      )}
    </Popup>
  );
};
