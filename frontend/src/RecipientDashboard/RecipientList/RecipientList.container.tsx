import { Heading, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { get } from "../../utils/http";

import { RecipientListComponent } from "./RecipientList.component";

const getRecipients = () => get("/recipients/all");

export const RecipientListContainer = ({
  selectedRecipient,
  setSelectedRecipient,
}: {
  selectedRecipient: string | null;
  setSelectedRecipient: (recipientId: string) => void;
}) => {
  const getRecipientsQuery = useQuery<
    {
      recipientId: string;
      firstName: string;
      lastName: string;
    }[]
  >({
    queryKey: ["recipients"],
    queryFn: getRecipients,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const recipients = getRecipientsQuery.data || [];

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
