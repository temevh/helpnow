import { Card, Button } from "@chakra-ui/react";
import { Post } from "../../types";

export const Postcard = ({ post }: { post: Post }) => {
  return (
    <Card.Root
      width="280px"
      maxWidth="280px"
      bg="gray.50"
      borderRadius="lg"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
    >
      <Card.Body gap="2" p="4">
        <Card.Title
          mt="2"
          fontSize="lg"
          lineHeight="1.3"
          overflow="hidden"
          color="gray.600"
        >
          {post.name}
        </Card.Title>
        <Card.Description fontSize="sm" lineHeight="1.4" color="gray.600">
          {post.description}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end" p="4" pt="0">
        <Button size="sm" colorScheme="blue">
          Join
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
