import { EditPostVariables, Post } from "@/types";
import { Box, HStack, Input, Text, VStack, Button } from "@chakra-ui/react";
import { DeleteButton, EditButton } from "../common/buttons";
import StatusBadge from "../common/badges/StatusBadge";
import VolunteerBadge from "../common/badges/VolunteerBadge";
import { convertUnixToDate } from "@/utils";
import ConfirmPopover from "../common/ConfirmPopover";
import { useState } from "react";
import { DateInput } from "../common/inputs";
import { EDIT_POST } from "@/graphql/mutations/post";
import { useMutation } from "@apollo/client/react";
import { useUser } from "@/hooks";

const CreatedPostCard = ({
  post,
  deletePost,
}: {
  post: Post;
  deletePost: (postId: string) => void;
}) => {
  const {user} = useUser();
  console.log(user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    name: post.name,
    description: post.description ?? "",
    address: post.address,
    volunteersNeeded: post.volunteersNeeded,
    taskTime: post.taskTime,
  });

  const [editPost, { loading, error, data }] = useMutation<
    { editPost: boolean },
    { postId: string; userId: string; post: EditPostVariables }
  >(EDIT_POST, {
    refetchQueries: ["GetPosts"],
  });

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditedPost({
      name: post.name,
      description: post.description ?? "",
      address: post.address,
      taskTime: post.taskTime,
      volunteersNeeded: post.volunteersNeeded,
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    editPost({
      variables: {
        postId: post.id,
        userId: user?.id,
        post: {
          name: editedPost.name,
          description: editedPost.description,
          address: editedPost.address,
          volunteersNeeded: editedPost.volunteersNeeded,
          taskTime: new Date(editedPost.taskTime),
        },
      },
    });
    setIsEditing(false);
  };

  console.log(post);
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} _hover={{ shadow: "md" }}>
      <VStack align="stretch" gap={3}>
        <HStack justify="space-between" align="start">
          {isEditing ? (
            <Input
              value={editedPost.name}
              onChange={(e) =>
                setEditedPost({ ...editedPost, name: e.target.value })
              }
            />
          ) : (
            <Text fontSize="lg" fontWeight="bold">
              {post.name}
            </Text>
          )}
          <StatusBadge status={post.status} />
        </HStack>

        {isEditing ? (
          <Input
            value={editedPost.description}
            onChange={(e) =>
              setEditedPost({ ...editedPost, description: e.target.value })
            }
            placeholder="Description"
          />
        ) : (
          post.description && (
            <Text fontSize="sm" color="gray.600">
              {post.description}
            </Text>
          )
        )}

        <VStack align="stretch" gap={2} fontSize="sm">
          <HStack justify="space-between">
            <Text>📍 Location:</Text>
            {isEditing ? (
              <Input
                value={editedPost.address}
                onChange={(e) =>
                  setEditedPost({ ...editedPost, address: e.target.value })
                }
              />
            ) : (
              <Text fontWeight="medium">{post.address}</Text>
            )}
          </HStack>

          <HStack justify="space-between">
            <Text>📅 Task Time:</Text>
            {isEditing ? (
              <DateInput
                value={
                  typeof editedPost.taskTime === "number"
                    ? new Date(editedPost.taskTime)
                    : null
                }
                onChange={(date) =>
                  setEditedPost({
                    ...editedPost,
                    taskTime: date ? date.getTime() : null,
                  })
                }
              />
            ) : (
              <Text fontWeight="medium">
                {convertUnixToDate(post.taskTime)}
              </Text>
            )}
          </HStack>

          <HStack justify="space-between">
            <Text>👥 Volunteers Needed:</Text>
            {isEditing ? (
              <Input
                type="number"
                value={editedPost.volunteersNeeded}
                onChange={(e) =>
                  setEditedPost({
                    ...editedPost,
                    volunteersNeeded: Number(e.target.value),
                  })
                }
                width="80px"
              />
            ) : (
              <VolunteerBadge
                volunteersAlready={post.volunteersAlready}
                volunteersNeeded={post.volunteersNeeded}
              />
            )}
          </HStack>

          <HStack justify="space-between">
            <Text>Created:</Text>
            <Text fontSize="xs">{convertUnixToDate(post.createdAt)}</Text>
          </HStack>
        </VStack>

        <HStack justify="flex-end" pt={2}>
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleCancel} variant="ghost">
                Cancel
              </Button>
              <Button size="sm" colorScheme="blue" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <>
              <ConfirmPopover
                onConfirm={() => deletePost(post.id)}
                title="Delete Post"
                description="Are you sure you want to delete this post?"
              >
                <DeleteButton />
              </ConfirmPopover>
              <EditButton onClick={handleEdit} />
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default CreatedPostCard;
