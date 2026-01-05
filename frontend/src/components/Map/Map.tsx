"use client";

import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { Post } from "@/types";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapPopUp } from "./MapPopUp";
import { getStatusColor } from "@/utils";
import { useEffect, useRef } from "react";
import { useMapControl } from "@/contexts/MapContext";

interface PostMapProps {
  posts: Post[];
  onOpenPost: (post: Post) => void;
}

//TODO: Add map controller and context

const PostMap = ({ posts, onOpenPost }: PostMapProps) => {
  return (
    <MapContainer
      center={[60.1699, 24.9384]}
      zoom={13}
      style={{ width: "100%", height: "100%", borderRadius: "12px" }}
      zoomControl={false}
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
              color: getStatusColor(post.status),
              fillColor: getStatusColor(post.status),
              fillOpacity: 0.3,
              weight: 2,
            }}
          >
            <MapPopUp post={post} onOpenPost={onOpenPost} />
          </Circle>
        ) : null
      )}
    </MapContainer>
  );
};

export default PostMap;
