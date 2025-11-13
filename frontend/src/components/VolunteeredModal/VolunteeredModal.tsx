import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogBackdrop,
} from "@chakra-ui/react";
import { Text, Stack, HStack, VStack } from "@chakra-ui/react";
import { CustomCloseButton } from "../common/buttons";
import { Post } from "@/types";

interface VolunteeredModalProps {
  posts: Post[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const VolunteeredModal = ({
  open,
  onOpenChange,
  posts,
}: VolunteeredModalProps) => {
  console.log(posts);
  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      placement="center"
    >
      <DialogBackdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <DialogContent
        maxW="2xl"
        bg="blue.50"
        borderRadius="2xl"
        boxShadow="2xl"
        border="2px solid"
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
          <VStack alignItems="flex-start" gap={2}>
            <HStack justify="space-between" w="full">
              <Text fontSize="2xl" fontWeight="bold" color={"black"}>
                Your volunteers
              </Text>
            </HStack>
          </VStack>
        </DialogHeader>

        <DialogBody p={6} bg="white">
          <p>AAAA</p>
        </DialogBody>

        <DialogFooter bg="blue.50" borderBottomRadius="2xl" p={4} gap={3}>
          <CustomCloseButton onClick={() => onOpenChange(false)} />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
