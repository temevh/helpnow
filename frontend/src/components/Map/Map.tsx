import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Box } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Post } from "@/types";

interface MapProps {
  posts: Post[];
}

export default function Map({ posts }: MapProps) {
  const defaultPosition: [number, number] = [60.1699, 24.9384]; //TODO: change to users location

  return (
    <Box
      h="700px"
      w="full"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      flex={1}
    >
      <MapContainer
        center={defaultPosition}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posts.map((post) => (
          <Marker key={post.id} position={[post.latitude, post.longitude]} />
        ))}
        <Marker position={defaultPosition}></Marker>
      </MapContainer>
    </Box>
  );
}
