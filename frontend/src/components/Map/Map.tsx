"use client";

import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
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

const MapController = ({ posts }: { posts: Post[] }) => {
  const map = useMap();
  const { registerJumpHandler } = useMapControl();
  const circlesRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    registerJumpHandler((postId: string) => {
      const post = posts.find((p) => p.id === postId);
      if (post?.latitude && post?.longitude) {
        map.flyTo([post.latitude, post.longitude], 16, {
          duration: 1.5,
        });

        setTimeout(() => {
          const circle = circlesRef.current.get(postId);
          circle?.openPopup();
        }, 1500);
      }
    });
  }, [map, posts, registerJumpHandler]);

  useEffect(() => {
    const handler = (e: any) => {
      if (e.target && e.target.options?.postId) {
        circlesRef.current.set(e.target.options.postId, e.target);
      }
    };

    map.eachLayer((layer: any) => {
      if (layer.options?.postId) {
        circlesRef.current.set(layer.options.postId, layer);
      }
    });

    return () => {
      circlesRef.current.clear();
    };
  }, [map, posts]);

  return null;
};

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

      <MapController posts={posts} />

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
            postId={post.id}
          >
            <MapPopUp post={post} onOpenPost={onOpenPost} />
          </Circle>
        ) : null
      )}
    </MapContainer>
  );
};
export default PostMap;
