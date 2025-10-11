import { GET_POSTS } from "@/graphql/queries/post";
import { useQuery } from "@apollo/client/react";

export const Postlist = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.posts.map((post: any) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>By: {post.creator.userName}</p>
        </div>
      ))}
    </div>
  );
};
