"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box } from "@chakra-ui/react";
import { Post } from "@/types";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapPopUp } from "./MapPopUp";

interface PostMapProps {
  posts: Post[];
}

const PostMap = ({ posts }: PostMapProps) => {
  return (
    <Box
      w="100%"
      h="100%"
      p={4}
      borderRadius="12px"
      bg="gray.100"
      boxShadow="sm"
      overflow="hidden"
    >
      <MapContainer
        center={[60.1699, 24.9384]}
        zoom={13}
        style={{ width: "100%", height: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {posts.map((post) =>
          post.latitude && post.longitude ? (
            <Marker key={post.id} position={[post.latitude, post.longitude]}>
              <MapPopUp post={post} />
            </Marker>
          ) : null
        )}
      </MapContainer>
    </Box>
  );
};

export default PostMap;
