import { Heading, VStack } from "@chakra-ui/react";

import { RecipientListComponent } from "./RecipientList.component";

export const RecipientListContainer = ({
  selectedRecipient,
  setSelectedRecipient,
}: {
  selectedRecipient: string | null;
  setSelectedRecipient: (recipientId: string) => void;
}) => {
  // TODO: fetch recipients from API
  const recipients = [
    {
      recipientId: "1",
      firstName: "Michael",
      lastName: "Scott",
    },
    {
      recipientId: "2",
      firstName: "Pam",
      lastName: "Beesly",
    },
    {
      recipientId: "3",
      firstName: "Jim",
      lastName: "Halpert",
    },
  ];

  return (
    <VStack
      h="100%"
      w="400px"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Heading size="md" m="20px">
        Care recipients
      </Heading>
      <VStack gap="10px" w="100%">
        <RecipientListComponent
          selectedRecipient={selectedRecipient}
          setSelectedRecipient={setSelectedRecipient}
          recipients={recipients}
        />
      </VStack>
    </VStack>
  );
};
