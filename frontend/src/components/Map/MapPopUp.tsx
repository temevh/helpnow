import { Badge } from "@chakra-ui/react";
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
      <div className="flex flex-row items-center justify-between mb-2">
        <h1 className="text-lg font-bold text-gray-800 flex-1 mr-2">
          <strong>{post.name}</strong>
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
      <p className="text-xs text-gray-500 mb-2">
        {convertUnixToDate(post.taskTime)}
      </p>
      <div className="flex flex-row gap-2">
        <OpenButton />
        {post.status === "OPEN" && <VolunteerButton />}
      </div>
    </Popup>
  );
};
