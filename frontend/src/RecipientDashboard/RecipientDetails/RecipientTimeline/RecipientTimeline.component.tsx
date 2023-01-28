import {
  Card,
  CardBody,
  HStack,
  VStack,
  Text,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { RecipientTimelineRecord } from "../types";

const getRecipientTimelineDetails = (
  recipientTimelineRecord: RecipientTimelineRecord
) => {
  const eventTypes = {
    regular_medication_taken: {
      message: "Regular medication taken",
      properties: [],
    },
    alert_raised: {
      message: "Alert raised",
      properties: [],
    },
    check_in: {
      message: "Check in",
      properties: [],
    },
    visit_cancelled: {
      message: "Visit cancelled",
      properties: [],
    },
    visit_completed: {
      message: "Visit completed",
      properties: [],
    },
    mood_observation: {
      message: "Mood observation",
      properties: ["mood", "note"],
    },
    check_out: {
      message: "Check out",
      properties: [],
    },
    fluid_intake_observation: {
      message: "Fluid intake observation",
      properties: ["fluid", "observed", "consumed_volume_ml"],
    },
    task_completed: {
      message: "Task completed",
      properties: ["task_schedule_note", "task_definition_description"],
    },
    physical_health_observation: {
      message: "Physical health observation",
      properties: ["note"],
    },
    no_medication_observation_received: {
      message: "No medication observation received",
      properties: ["medication_type", "expected_dose_timestamp"],
    },
    incontinence_pad_observation: {
      message: "Incontinence pad observation",
      properties: ["pad_condition"],
    },
    general_observation: {
      message: "General observation",
      properties: ["note"],
    },
    regular_medication_not_taken: {
      message: "Regular medication not taken",
      properties: ["medication_failure_reason", "note"],
    },
    food_intake_observation: {
      message: "Food intake observation",
      properties: ["meal", "note"],
    },
    task_completion_reverted: {
      message: "Task completion reverted",
      properties: ["task_schedule_note", "task_definition_description"],
    },
    mental_health_observation: {
      message: "Mental health observation",
      properties: ["note"],
    },
    medication_schedule_updated: {
      message: "Medication schedule updated",
      properties: ["dose_size", "note"],
    },
    regular_medication_maybe_taken: {
      message: "Regular medication maybe taken",
      properties: ["medication_failure_reason", "note"],
    },
    medication_schedule_created: {
      message: "Medication schedule created",
      properties: ["dose_size", "note", "type"],
    },
    alert_qualified: {
      message: "Alert qualified",
      properties: ["alert_severity"],
    },
    task_schedule_created: {
      message: "Task schedule created",
      properties: ["note"],
    },
    concern_raised: {
      message: "Concern raised",
      properties: ["note", "severity"],
    },
    regular_medication_partially_taken: {
      message: "Regular medication partially taken",
      properties: ["medication_failure_reason", "note", "medication_type"],
    },
    catheter_observation: {
      message: "Catheter observation",
      properties: ["note", "volume_ml"],
    },
    toilet_visit_recorded: {
      message: "Toilet visit recorded",
      properties: ["note", "visit_type", "visit_count", "observed"],
    },
  };

  const { message = "", properties = [] } =
    eventTypes[recipientTimelineRecord?.event_type as keyof typeof eventTypes];

  return {
    id: recipientTimelineRecord.id,
    timestamp: recipientTimelineRecord.timestamp.split("T")[1].slice(0, -1),
    details: properties.reduce(
      (acc: Record<string, unknown>, prop: string) => ({
        ...acc,
        [prop]: recipientTimelineRecord.payload[prop],
      }),
      {}
    ),
    message,
  };
};

export const RecipientTimelineComponent = ({
  isLoading,
  isFetching,
  recipientTimeline,
  selectedRecipientTimelineDetails,
  setSelectedRecipientTimelineDetails,
}: {
  isLoading: boolean;
  isFetching: boolean;
  recipientTimeline: RecipientTimelineRecord[];
  selectedRecipientTimelineDetails: {
    id: string;
    details: Record<string, string>;
  } | null;
  setSelectedRecipientTimelineDetails: ({
    id,
    details,
  }: {
    id: string;
    details: Record<string, string>;
  }) => void;
}) => {
  if (isLoading && isFetching) {
    return (
      <Center w="100%" h="100%">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!recipientTimeline.length) {
    return (
      <Center w="100%" h="100%" bg="white" borderRadius="md" boxShadow="md">
        <VStack>
          <Heading fontSize="lg">
            Please select a date to view the recipient timeline
          </Heading>
        </VStack>
      </Center>
    );
  }

  return (
    <>
      {recipientTimeline
        .map(getRecipientTimelineDetails)
        .map(({ id, timestamp, message, details }) => {
          return (
            <Card
              key={id}
              w="100%"
              _hover={{
                boxShadow: "lg",
                cursor: "pointer",
              }}
              bg={
                selectedRecipientTimelineDetails?.id === id
                  ? "blackAlpha.100"
                  : "white"
              }
              onClick={() =>
                setSelectedRecipientTimelineDetails({
                  id,
                  details,
                })
              }
            >
              <CardBody>
                <VStack>
                  <HStack>
                    <Heading fontSize="md">Time:</Heading>
                    <Text>{timestamp}</Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize="md">Event:</Heading>
                    <Text>{message}</Text>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          );
        })}
    </>
  );
};
