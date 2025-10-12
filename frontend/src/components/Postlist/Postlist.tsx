import { GET_POSTS } from "@/graphql/queries/post";
import { useQuery } from "@apollo/client/react";
import { Postcard } from "./Postcard";
import { VStack } from "@chakra-ui/react";
import { Post } from "@/types";

export const Postlist = () => {
  const { data, loading, error } = useQuery<{ posts: Post[] }>(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <VStack gap={2}>
      {data &&
        data.posts.map((post: any) => <Postcard post={post} key={post.id} />)}
    </VStack>
  );
};
