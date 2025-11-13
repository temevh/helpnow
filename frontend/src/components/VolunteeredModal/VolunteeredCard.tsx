import { HStack, Text } from "@chakra-ui/react";

export const VolunteeredCard = ({ post }) => {
  return (
    <HStack>
      <Text>{post.name}</Text>
    </HStack>
  );
};
