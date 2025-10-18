"use client";

import dynamic from "next/dynamic";
import { GET_POSTS } from "@/graphql/queries/post";
import { useQuery } from "@apollo/client/react";
import { Postlist } from "@/components/Postlist/Postlist";
import { HStack, Box, Container } from "@chakra-ui/react";
import { Post } from "@/types";

const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
  loading: () => <p>A map is loading...</p>,
});

export default function Home() {
  const { data, loading, error } = useQuery<{ posts: Post[] }>(GET_POSTS);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxW="100%" p={6} pt={6}>
      <HStack w="full" align="start" gap={6} height="calc(100vh - 100px)">
        <Box flex="1" height="100%">
          <Map posts={data?.posts ?? []} />
        </Box>
        <Box flex="0.3" height="100%">
          <Postlist posts={data?.posts ?? []} />
        </Box>
      </HStack>
    </Container>
  );
}
