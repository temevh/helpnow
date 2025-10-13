import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { Popup } from "react-leaflet";
import { Post } from "@/types";

interface MapPopUpProps {
  post: Post;
}

export const MapPopUp = ({ post }: MapPopUpProps) => {
  return (
    <Popup closeButton={true}>
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="md"
        p={3}
        minW="200px"
        maxW="250px"
      >
        <VStack spacing={2} align="start">
          <Text fontWeight="bold" fontSize="md" noOfLines={1}>
            {post.name}
          </Text>
          {post.description && (
            <Text fontSize="sm" color="gray.600" noOfLines={3}>
              {post.description}
            </Text>
          )}
          <Button size="sm" colorScheme="blue" w="full">
            Join
          </Button>
        </VStack>
      </Box>
    </Popup>
  );
};
