import { GET_POSTS } from "@/graphql/queries/post";
import { useQuery } from "@apollo/client/react";
import { Postcard } from "./Postcard";
import { VStack } from "@chakra-ui/react";

export const Postlist = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <VStack gap={2}>
      {data.posts.map((post: any) => (
        <Postcard post={post} key={post.id} />
      ))}
    </VStack>
  );
};
