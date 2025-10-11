import { Card, Button } from "@chakra-ui/react";

export const Postcard = ({ post }) => {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Card.Title mt="2">{post.name}</Card.Title>
        <Card.Description>{post.description}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button>Join</Button>
      </Card.Footer>
    </Card.Root>
  );
};
