import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Box } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface MapProps {
  position?: [number, number];
  zoom?: number;
}

export default function Map({
  position = [60.1699, 24.9384],
  zoom = 13,
}: MapProps) {
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
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
      </MapContainer>
    </Box>
  );
}
