"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Postlist } from "@/components/Postlist/Postlist";
import { HStack, Box, Container } from "@chakra-ui/react";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <Container maxW="100%" p={6} pt={12}>
      <HStack w="full" align="start" gap={6}>
        <Map />
        <Postlist />
      </HStack>
    </Container>
  );
}
