import {
  Center,
  Flex,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { RecipientCalendarComponent } from "./RecipientCalendar/RecipientCalendar.component";
import { get } from "../../utils/http";
import { useQuery } from "@tanstack/react-query";
import { RecipientTimelineComponent } from "./RecipientTimeline/RecipientTimeline.component";
import { RecipientTimelineRecord } from "./types";
import { RecipientDetailsComponent } from "./RecipientDetails.component";

const getRecipientVisitDates = (recipientId: string) =>
  get(`/recipients/${recipientId}/visit-dates`);

const getRecipientTimelineForDate = (
  recipientId: string,
  visitDateString: string
) =>
  get(`/recipients/${recipientId}/timeline?visitDateString=${visitDateString}`);

export const RecipientDetailsContainer = ({
  selectedRecipient,
  selectedVisitStringDate,
  selectedRecipientTimelineDetails,
  setSelectedVisitStringDate,
  setSelectedRecipientTimelineDetails,
}: {
  selectedRecipient: string | null;
  selectedVisitStringDate: string | null;
  selectedRecipientTimelineDetails: {
    id: string;
    details: Record<string, string>;
  } | null;
  setSelectedVisitStringDate: (visitDateString: string) => void;
  setSelectedRecipientTimelineDetails: (
    selectedRecipientTimelineDetails: {
      id: string;
      details: Record<string, string>;
    } | null
  ) => void;
}) => {
  const getRecipientVisitDatesQuery = useQuery<string[]>({
    queryKey: ["recipients", selectedRecipient, "visit-dates"],
    queryFn: () => getRecipientVisitDates(selectedRecipient!),
    enabled: !!selectedRecipient,
  });

  const getRecipientTimelineForDateQuery = useQuery<RecipientTimelineRecord[]>({
    queryKey: [
      "recipients",
      selectedRecipient,
      "timeline",
      selectedVisitStringDate,
    ],
    queryFn: () =>
      getRecipientTimelineForDate(selectedRecipient!, selectedVisitStringDate!),
    enabled: !!selectedRecipient && !!selectedVisitStringDate,
  });

  const handleSetSelectedVisitStringDate = (visitDateString: string) => {
    setSelectedVisitStringDate(visitDateString);
    setSelectedRecipientTimelineDetails(null);
  }

  const visitDateString = getRecipientVisitDatesQuery.data || [];
  const recipientTimeline = getRecipientTimelineForDateQuery.data || [];

  if (!selectedRecipient) {
    return (
      <Center w="100%" h="100%" bg="white" borderRadius="md" boxShadow="md">
        <VStack>
          <Heading fontSize="lg">
            Please select a recipient from the list on the left to view the
            details
          </Heading>
        </VStack>
      </Center>
    );
  }

  return (
    <HStack w="100%" h="100%">
      <VStack w="100%" h="100%">
        <Heading fontSize="lg">Calendar</Heading>
        <RecipientCalendarComponent
          visitDates={visitDateString.map(
            (visitDateString) => new Date(visitDateString)
          )}
          isLoading={getRecipientVisitDatesQuery.isLoading}
          setSelectedVisitStringDate={handleSetSelectedVisitStringDate}
        />
        <Heading fontSize="lg" mt="20px">
          Details
        </Heading>
        <VStack w="100%" h="100%" bg="white" borderRadius="md" boxShadow="md">
          <RecipientDetailsComponent
            selectedRecipientTimelineDetails={selectedRecipientTimelineDetails}
          />
        </VStack>
      </VStack>
      <Flex w="100%" h="100%">
        <VStack w="100%" h="100%">
          <Heading fontSize="lg">Timeline</Heading>
          <VStack
            w="100%"
            h="100%"
            overflowY="scroll"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            <RecipientTimelineComponent
              isLoading={getRecipientTimelineForDateQuery.isLoading}
              isFetching={getRecipientTimelineForDateQuery.isFetching}
              selectedRecipientTimelineDetails={
                selectedRecipientTimelineDetails
              }
              setSelectedRecipientTimelineDetails={
                setSelectedRecipientTimelineDetails
              }
              recipientTimeline={recipientTimeline}
            />
          </VStack>
        </VStack>
      </Flex>
    </HStack>
  );
};
