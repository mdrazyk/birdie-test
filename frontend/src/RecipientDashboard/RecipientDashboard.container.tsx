import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { RecipientDetailsContainer } from "./RecipientDetails/RecipientDetails.container";
import { RecipientListContainer } from "./RecipientList/RecipientList.container";

export const RecipientDashboard = () => {
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(
    null
  );

  const [selectedVisitStringDate, setSelectedVisitStringDate] = useState<string | null>(null);

  return (
    <HStack h="100vh" p="10px" bg="blackAlpha.100">
      <RecipientListContainer
        selectedRecipient={selectedRecipient}
        setSelectedRecipient={setSelectedRecipient}
      />
      <VStack h="100%" w="100%">
        <RecipientDetailsContainer
          selectedRecipient={selectedRecipient}
          selectedVisitStringDate={selectedVisitStringDate}
          setSelectedVisitStringDate={setSelectedVisitStringDate}
        />
      </VStack>
    </HStack>
  );
};
