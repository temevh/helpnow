"use client";
import { GET_POSTS } from "@/graphql/queries/post";
import { useQuery } from "@apollo/client/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Postlist } from "@/components/Postlist/Postlist";
import { HStack, Box, Container } from "@chakra-ui/react";
import { Post } from "@/types";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const { data, loading, error } = useQuery<{ posts: Post[] }>(GET_POSTS);

  return (
    <Container maxW="100%" p={6} pt={12}>
      {loading ? (
        <p>Loading data</p>
      ) : (
        <HStack w="full" align="start" gap={6}>
          <Map posts={data?.posts} />
          <Postlist posts={data?.posts} />
        </HStack>
      )}
    </Container>
  );
}
