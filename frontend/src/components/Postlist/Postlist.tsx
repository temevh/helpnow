import { Postcard } from "./Postcard";
import { VStack, ScrollArea } from "@chakra-ui/react";
import { Post } from "@/types";

interface PostListProps {
  posts: Post[];
  onOpenPost: (post: Post) => void;
}

export const Postlist = ({ posts, onOpenPost }: PostListProps) => {
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <VStack align="stretch" gap={3}>
          {posts.map((post) => (
            <Postcard post={post} key={post.id} onOpenPost={onOpenPost} />
          ))}
        </VStack>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
};
