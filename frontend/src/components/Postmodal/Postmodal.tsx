import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import {
  Button,
  Text,
  Stack,
  Box,
  Badge,
  HStack,
  VStack,
  Separator,
} from "@chakra-ui/react";
import { getStatusBadgeColor } from "@/utils";
import { convertUnixToDate } from "@/utils";
import { Post } from "@/types";
import StatusBadge from "../common/StatusBadge";

interface PostmodalProps {
  post?: Post;
}

export default function Postmodal({ post }: PostmodalProps) {
  console.log(post);
  const statusColors = getStatusBadgeColor(post?.status || "");
  const currentVolunteers = 0;

  return (
    <DialogRoot open>
      <DialogContent
        maxW="2xl"
        bg="blue.50"
        borderRadius="2xl"
        boxShadow="2xl"
        border="2px solid"
        borderColor="blue.200"
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
              <Badge
                colorScheme="blue"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="md"
                fontWeight="bold"
              >
                {currentVolunteers} / {post?.volunteerAmount}
              </Badge>
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
          <Button
            colorScheme="gray"
            variant="outline"
            size="lg"
            onClick={() => {}}
          >
            Close
          </Button>
          {post?.status === "OPEN" && (
            <Button
              bgGradient="linear(to-r, green.500, green.600)"
              color="white"
              size="lg"
              _hover={{
                bgGradient: "linear(to-r, green.600, green.700)",
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s ease"
              fontWeight="semibold"
            >
              🙋‍♂️ Volunteer Now
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
