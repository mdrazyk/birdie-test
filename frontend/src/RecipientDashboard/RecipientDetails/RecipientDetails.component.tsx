import { Center, Heading, VStack, Text, Divider } from "@chakra-ui/react";

export const RecipientDetailsComponent = ({
  selectedRecipientTimelineDetails,
}: {
  selectedRecipientTimelineDetails: {
    id: string;
    details: Record<string, string>;
  } | null;
}) => {
  if (selectedRecipientTimelineDetails) {
    if (!Object.keys(selectedRecipientTimelineDetails.details).length) {
      return (
        <Center w="100%" h="100%">
          <Heading fontSize="lg">
            There are no details for this timeline item
          </Heading>
        </Center>
      );
    }

    return (
      <VStack h="100%" w="100%" p="20px" gap="10px">
        {Object.entries(selectedRecipientTimelineDetails.details).map(
          ([key, value]) => (
            <VStack w="100%" key={`${key}-${value}`}>
              <Heading fontSize="md">{key}</Heading>
              <Text>{value}</Text>
              <Divider/>
            </VStack>
          )
        )}
      </VStack>
    );
  }

  return (
    <Center w="100%" h="100%">
      <Heading fontSize="lg">
        Please select a timeline item to view the details
      </Heading>
    </Center>
  );
};
