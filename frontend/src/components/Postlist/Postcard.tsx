import {
  Text,
  Badge,
  Button,
  CardRoot,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
} from "@chakra-ui/react";

import { Post } from "@/types";

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "OPEN":
      return "green";
    case "ACCEPTED":
      return "yellow";
    case "COMPLETED":
      return "lightblue";
    default:
      return "gray";
  }
};

export const Postcard = ({ post }: { post: Post }) => {
  return (
    <CardRoot
      width="500px"
      maxW="500px"
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
        <HStack>
          <Text fontWeight="semibold" fontSize="lg" color={"black"}>
            {post.name}
          </Text>
          <Text fontWeight="semibold" fontSize="lg" color={"black"}>
            {post.latitude} {post.longitude}
          </Text>
          <Badge
            backgroundColor={getStatusBadgeColor(post.status)}
            px="2"
            py="1"
            borderRadius="md"
            color={"black"}
            fontWeight={"bold"}
          >
            {post.status}
          </Badge>
        </HStack>
      </CardHeader>

      <CardBody p="2">
        <Text fontSize="sm" color="gray.700" mb="3">
          {post.description || "No description provided."}
        </Text>
      </CardBody>

      <CardFooter p="4" pt="0">
        <HStack>
          <Button
            width="100%"
            size="sm"
            colorScheme="blue"
            borderRadius="md"
            fontWeight="medium"
          >
            Show
          </Button>
          <Button
            width="100%"
            size="sm"
            colorScheme="blue"
            borderRadius="md"
            fontWeight="medium"
          >
            Join
          </Button>
        </HStack>
      </CardFooter>
    </CardRoot>
  );
};
