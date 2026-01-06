import { Text, Stack, HStack, VStack, Heading } from "@chakra-ui/react";
import { Post } from "@/types";
import StatusBadge from "../common/badges/StatusBadge";
import {
  VolunteerButton,
  CustomCloseButton,
  JumpToPostButton,
} from "../common/buttons";
import {
  TaskTimeCard,
  TaskDescriptionCard,
  TaskVolunteerCard,
  TaskRewardCard,
} from "../common/infocards";
import { BasicModal } from "../common/modals/BasicModal";

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
  const canVolunteer =
    (post?.volunteersAlready ?? 0) < (post?.volunteersNeeded ?? 1);

  return (
    <BasicModal
      open={open}
      onOpenChange={onOpenChange}
      header={
        <VStack alignItems="flex-start" gap={2}>
          <HStack justify="space-between" w="full">
            <Heading fontSize="2xl" fontWeight="bold" color={"black"}>
              {post?.name}
            </Heading>

            <StatusBadge status={post?.status || ""} />
          </HStack>
        </VStack>
      }
      footer={
        <>
          <JumpToPostButton
            postId={post?.id}
            onModalClose={() => onOpenChange(false)}
          />
          {post?.status === "OPEN" && canVolunteer && (
            <VolunteerButton postId={post.id} />
          )}
        </>
      }
    >
      {!post ? (
        <Text>Error viewing post</Text>
      ) : (
        <Stack gap={4}>
          <TaskDescriptionCard description={post.description} />
          <TaskTimeCard time={post.taskTime} />
          <TaskVolunteerCard
            volunteersAlready={post.volunteersAlready}
            volunteersNeeded={post.volunteersNeeded}
          />

          {post?.reward && post.reward > 0 && (
            <TaskRewardCard reward={post.reward} />
          )}
        </Stack>
      )}
    </BasicModal>
  );
}
