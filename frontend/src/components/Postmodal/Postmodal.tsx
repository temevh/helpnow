import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import { Button, Text, Stack } from "@chakra-ui/react";

export default function Postmodal({ post }) {
  return (
    <DialogRoot open>
      <DialogContent>
        <DialogCloseTrigger />

        <DialogHeader>{post?.name}</DialogHeader>

        <DialogBody>
          <Stack spacing={3}>
            <Field label="Description" value={post?.description || "—"} />
            <Field
              label="Task Time"
              value={new Date(post?.taskTime).toLocaleString()}
            />
            <Field label="Volunteer Amount" value={post?.volunteerAmount} />
            <Field label="Reward" value={`${post?.reward} points`} />
            <Field label="Status" value={post?.status} />
            <Field
              label="Created At"
              value={new Date(post?.createdAt).toLocaleString()}
            />
          </Stack>
        </DialogBody>

        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

function Field({ label, value }) {
  return (
    <Stack spacing={0}>
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>
      <Text fontWeight="medium">{value}</Text>
    </Stack>
  );
}
