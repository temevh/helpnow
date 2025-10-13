import { Postcard } from "./Postcard";
import { VStack, Box, ScrollArea } from "@chakra-ui/react";
import { Post } from "@/types";

interface PostListProps {
  posts: Post[];
}

export const Postlist = ({ posts }: PostListProps) => {
  return (
    <ScrollArea.Root flex="0.4" h="700px">
      <ScrollArea.Viewport>
        <VStack align="stretch" gap={3}>
          {posts.map((post) => (
            <Postcard post={post} key={post.id} />
          ))}
        </VStack>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
};
