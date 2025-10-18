"use client";

import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { Post } from "@/types";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapPopUp } from "./MapPopUp";
import { getCircleColor } from "@/utils";

interface PostMapProps {
  posts: Post[];
}

const PostMap = ({ posts }: PostMapProps) => {
  return (
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
          <Circle
            key={post.id}
            center={[post.latitude, post.longitude]}
            radius={150}
            pathOptions={{
              color: getCircleColor(post.status),
              fillColor: getCircleColor(post.status),
              fillOpacity: 0.3,
              weight: 2,
            }}
          >
            <MapPopUp post={post} />
          </Circle>
        ) : null
      )}
    </MapContainer>
  );
};

export default PostMap;
