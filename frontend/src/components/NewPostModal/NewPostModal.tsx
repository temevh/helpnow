import { BasicModal } from "../common/modals/BasicModal";
import { HStack, VStack } from "@chakra-ui/react";
import {
  TextInput,
  DateInput,
  NumberInput,
  CountryRegionInput,
} from "../common/inputs";
import { SaveButton } from "../common/buttons";
import { CreatePostVariables } from "@/types";
import { useState } from "react";
import { CREATE_POST } from "@/graphql/mutations/post";
import { useMutation } from "@apollo/client/react";
import { useUser } from "@/hooks/useUser";

interface NewPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewPostModal = ({ open, onOpenChange }: NewPostModalProps) => {
  const { user } = useUser();
  const [postName, setPostName] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postDate, setPostDate] = useState(new Date());
  const [volunteersNeeded, setVolunteersNeeded] = useState("1");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  const [createPost, { loading, error, data }] = useMutation<
    { createPost: any },
    { post: CreatePostVariables }
  >(CREATE_POST);

  const saveClicked = () => {
    /*
    if (!user?.id) {
      alert("You must be logged in to create a post");
      return;
    }*/

    const post = {
      name: postName,
      description: postDescription,
      taskTime: postDate,
      volunteersNeeded: Number(volunteersNeeded),
      country: country,
      region: region,
      address: address,
      postcode: postcode,
      userId: user.id,
    };

    createPost({ variables: { post } })
      .then(() => {
        alert("Post created successfully!");
        onOpenChange(false);
      })
      .catch((err) => {
        alert(`Error creating post: ${err.message}`);
      });
  };

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
          value={postDescription}
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
        <HStack gap={4} align="stretch">
          <TextInput
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street address"
            label="Address"
            value={address}
            required
          />
          <TextInput
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="12345"
            label="Postcode"
            value={postcode}
            required
          />
        </HStack>
        <SaveButton saveClicked={saveClicked} />
      </VStack>
    </BasicModal>
  );
};
