import {
  Text,
  Badge,
  CardRoot,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
} from "@chakra-ui/react";
import { OpenButton, VolunteerButton } from "../common/buttons";
import { Post } from "@/types";
import { getStatusBadgeColor } from "../../utils";

export const Postcard = ({ post }: { post: Post }) => {
  return (
    <CardRoot
      width="400px"
      maxW="400px"
      borderRadius="2xl"
      bg="white"
      border="1px solid"
      borderColor="gray.300"
    >
      <CardHeader
        bgGradient="linear(to-r, blue.500, blue.400)"
        color="white"
        borderTopRadius="2xl"
        p="2"
      >
        <HStack>
          <Text fontWeight="semibold" fontSize="lg" color={"black"}>
            {post.name}
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
        <Text
          fontSize="sm"
          color="white"
          bg="gray.400"
          p="2"
          borderRadius="md"
          lineHeight="1.5"
        >
          {post.description || "No description provided."}
        </Text>
      </CardBody>

      <CardFooter p="2" pt="0">
        <HStack w="100%" gap={2}>
          <OpenButton />
          <VolunteerButton />
        </HStack>
      </CardFooter>
    </CardRoot>
  );
};
