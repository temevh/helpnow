import { BasicModal } from "../common/modals/BasicModal";
import { HStack, Input, VStack } from "@chakra-ui/react";
import { TextInput } from "../common/inputs";
import { useState } from "react";
import DateInput from "../common/inputs/DateInput";
import NumberInput from "../common/inputs/NumberInput";

interface NewPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewPostModal = ({ open, onOpenChange }: NewPostModalProps) => {
  const [postName, setPostName] = useState("");
  const [postDescrtiption, setPostDescription] = useState("");
  const [postDate, setPostDate] = useState(new Date());
  const [volunteersNeeded, setVolunteersNeeded] = useState("1");
  const [reward, setReward] = useState("0");

  return (
    <BasicModal
      open={open}
      onOpenChange={onOpenChange}
      header="Create new post"
    >
      <VStack gap={4} align="stretch">
        <TextInput
          onChange={(e) => setPostName(e.target.value)}
          placeholder="Name"
          label="Post title"
          value={postName}
          required
        />
        <TextInput
          onChange={(e) => setPostDescription(e.target.value)}
          placeholder="Give a short description about the post"
          label="Description"
          value={postDescrtiption}
          required
          bigText
        />

        <HStack gap={4} align="stretch">
          <NumberInput
            onChange={(e) => setVolunteersNeeded(e.target.value)}
            placeholder="1"
            label="Volunteers needed"
            value={volunteersNeeded}
            required
          />
          <DateInput
            onChange={(date) => setPostDate(date || new Date())}
            value={postDate}
            label="Task date and time"
            required
          />
        </HStack>
      </VStack>
    </BasicModal>
  );
};
