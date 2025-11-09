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
import { getStatusBadgeColor } from "@/utils";
import { convertUnixToDate } from "@/utils";
import { Post } from "@/types";
import StatusBadge from "../common/badges/StatusBadge";
import { VolunteerButton, CustomCloseButton } from "../common/buttons";
import VolunteerBadge from "../common/badges/VolunteerBadge";

interface PostmodalProps {
  post?: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Postmodal({
  post,
  open,
  onOpenChange,
}: PostmodalProps) {
  console.log(post);
  const statusColors = getStatusBadgeColor(post?.status || "");
  const canVolunteer =
    (post?.volunteersAlready ?? 0) < (post?.volunteersNeeded ?? 1);

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
                {post?.name}
              </Text>

              <StatusBadge status={post?.status} />
            </HStack>
          </VStack>
        </DialogHeader>

        <DialogBody p={6} bg="white">
          <Stack gap={4}>
            <Text fontSize="lg" fontWeight="semibold" color="blue.700">
              Description
            </Text>
            <Text color="gray.700" lineHeight="1.6">
              {post?.description || "No description provided"}
            </Text>

            <HStack
              p={3}
              bg="blue.50"
              borderRadius="lg"
              justify="space-between"
            >
              <HStack>
                <Text fontSize="lg">📅</Text>
                <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                  Task Time
                </Text>
              </HStack>
              <Text fontWeight="medium" color="gray.800">
                {post?.taskTime ? convertUnixToDate(post.taskTime) : "N/A"}
              </Text>
            </HStack>

            <HStack
              p={3}
              bg="blue.50"
              borderRadius="lg"
              justify="space-between"
            >
              <HStack>
                <Text fontSize="lg">🙋‍♂️</Text>
                <Text fontSize="sm" fontWeight="semibold" color="gray.600">
                  Volunteers Needed
                </Text>
              </HStack>

              <VolunteerBadge
                volunteersAlready={post?.volunteersAlready ?? 0}
                volunteersNeeded={post?.volunteersNeeded}
              />
            </HStack>

            {post?.reward && post.reward > 0 && (
              <HStack
                p={3}
                bg="green.50"
                borderRadius="lg"
                justify="space-between"
                border="1px solid"
                borderColor="green.200"
              >
                <HStack>
                  <Text fontSize="lg">💰</Text>
                  <Text fontSize="sm" fontWeight="semibold" color="green.700">
                    Reward
                  </Text>
                </HStack>
                <Text fontWeight="bold" color="green.600" fontSize="lg">
                  €{post?.reward}
                </Text>
              </HStack>
            )}
          </Stack>
        </DialogBody>

        <DialogFooter bg="blue.50" borderBottomRadius="2xl" p={4} gap={3}>
          <CustomCloseButton onClick={() => onOpenChange(false)} />
          {post?.status === "OPEN" && canVolunteer && (
            <VolunteerButton postId={post.id} />
          )}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
