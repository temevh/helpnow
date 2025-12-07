import { Text } from "@chakra-ui/react";

const TaskDescriptionCard = ({
  description,
  hideHeader = false,
}: {
  description: string | null | undefined;
  hideHeader?: boolean;
}) => {
  return (
    <>
      <Text
        fontSize="lg"
        fontWeight="semibold"
        color="blue.700"
        hidden={hideHeader}
      >
        Description
      </Text>
      <Text color="gray.700" lineHeight="1.6">
        {description || "No description provided"}
      </Text>
    </>
  );
};

export default TaskDescriptionCard;
