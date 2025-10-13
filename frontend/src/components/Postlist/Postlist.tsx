import { GET_POSTS } from "@/graphql/queries/post";
import { useQuery } from "@apollo/client/react";
import { Postcard } from "./Postcard";
import { VStack, Box, ScrollArea } from "@chakra-ui/react";
import { Post } from "@/types";

export const Postlist = () => {
  const { data, loading, error } = useQuery<{ posts: Post[] }>(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ScrollArea.Root flex="0.4" h="700px">
      <ScrollArea.Viewport>
        <VStack align="stretch" gap={3}>
          {data?.posts.map((post) => (
            <Postcard post={post} key={post.id} />
          ))}
        </VStack>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
};
