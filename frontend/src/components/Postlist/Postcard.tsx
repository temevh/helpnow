import { CardRoot, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Box, Text, Flex, Badge, Button } from "@chakra-ui/react";

import { Post } from "@/types";

export const Postcard = ({ post }: { post: Post }) => {
  return (
    <CardRoot
      width="300px"
      maxW="300px"
      borderRadius="2xl"
      bg="whiteAlpha.800"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.200"
      backdropFilter="blur(8px)"
      transition="all 0.25s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
        borderColor: "blue.300",
      }}
    >
      <CardHeader
        bgGradient="linear(to-r, blue.500, blue.400)"
        color="white"
        borderTopRadius="2xl"
        p="3"
      >
        <Text fontWeight="semibold" fontSize="lg" noOfLines={1}>
          {post.name}
        </Text>
      </CardHeader>

      <CardBody p="4">
        <Text fontSize="sm" color="gray.700" noOfLines={3} mb="3">
          {post.description || "No description provided."}
        </Text>

        <Flex justify="space-between" align="center" mb="3">
          <Badge colorScheme="blue" px="2" py="1" borderRadius="md">
            {post.status}
          </Badge>
          <Text fontSize="xs" color="gray.500">
            Reward: <b>{post.reward}</b>
          </Text>
        </Flex>

        <Text fontSize="sm" color="gray.600">
          By <b>{post.creator.userName}</b>
        </Text>
      </CardBody>

      <CardFooter p="4" pt="0">
        <Button
          width="100%"
          size="sm"
          colorScheme="blue"
          borderRadius="md"
          fontWeight="medium"
        >
          Join
        </Button>
      </CardFooter>
    </CardRoot>
  );
};
