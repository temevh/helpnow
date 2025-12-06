import { HStack, Text } from "@chakra-ui/react";

const TaskDescriptionCard = ({
  description,
}: {
  description: string | null;
}) => {
  return (
    <>
      <Text fontSize="lg" fontWeight="semibold" color="blue.700">
        Description
      </Text>
      <Text color="gray.700" lineHeight="1.6">
        {description || "No description provided"}
      </Text>
    </>
  );
};

export default TaskDescriptionCard;
