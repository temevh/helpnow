import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogBackdrop,
} from "@chakra-ui/react";
import { Text, HStack, VStack } from "@chakra-ui/react";
import { CustomCloseButton } from "../common/buttons";
import { Post } from "@/types";
import { VolunteeredCard } from "./VolunteeredCard";

interface VolunteeredModalProps {
  posts: Post[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
}

export const VolunteeredModal = ({
  open,
  onOpenChange,
  posts,
  loading,
}: VolunteeredModalProps) => {
  if (loading) return <p>Loading...</p>;
  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      placement="center"
      closeOnEscape
    >
      <DialogBackdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <DialogContent
        maxW="3xl"
        maxH="85vh"
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        border="3px solid"
        borderColor="blue.200"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={1000}
      >
        <DialogCloseTrigger
          top={4}
          right={4}
          bg="white"
          borderRadius="full"
          _hover={{ bg: "blue.100" }}
        />

        <DialogHeader
          bgGradient="linear(to-r, blue.400, blue.500)"
          color="white"
          borderTopRadius="2xl"
          p={6}
        >
          <HStack justify="space-between" align="center" w={"100%"}>
            <Text fontSize="2xl" fontWeight="bold" color={"black"}>
              Your volunteers
            </Text>
            <CustomCloseButton onClick={() => onOpenChange(false)} />
          </HStack>
        </DialogHeader>

        <DialogBody
          px={6}
          bg="white"
          overflowY="auto"
          maxH="calc(85vh - 200px)"
          css={{
            "&::-webkit-scrollbar": {
              width: "0px",
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <VStack gap={2} align="stretch">
            {posts.map((post: Post) => {
              return <VolunteeredCard key={post.id} post={post.post as Post} />;
            })}
          </VStack>
        </DialogBody>

        <DialogFooter
          bg="blue.50"
          borderBottomRadius="2xl"
          p={4}
          gap={3}
        ></DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
