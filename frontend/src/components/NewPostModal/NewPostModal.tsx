import { BasicModal } from "../common/modals/BasicModal";
import { HStack, VStack } from "@chakra-ui/react";
import {
  TextInput,
  DateInput,
  NumberInput,
  CountryRegionInput,
} from "../common/inputs";
import { useState } from "react";

interface NewPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewPostModal = ({ open, onOpenChange }: NewPostModalProps) => {
  const [postName, setPostName] = useState("");
  const [postDescrtiption, setPostDescription] = useState("");
  const [postDate, setPostDate] = useState(new Date());
  const [volunteersNeeded, setVolunteersNeeded] = useState("1");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

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
        <CountryRegionInput
          countryValue={country}
          regionValue={region}
          onCountryChange={setCountry}
          onRegionChange={setRegion}
          required
        />
      </VStack>
    </BasicModal>
  );
};
