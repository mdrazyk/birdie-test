import { Center, chakra, Spinner, VStack } from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ChakraCalendar = chakra(Calendar);

export const RecipientCalendarComponent = ({
  visitDates,
  isLoading,
  setSelectedVisitStringDate,
}: {
  visitDates: Date[];
  isLoading: boolean;
  setSelectedVisitStringDate: (visitDate: string) => void;
}) => {
  return (
    <VStack w="100%" h="100%" bg="white" borderRadius="md">
      {isLoading ? (
        <Center w="100%" h="100%">
          <Spinner size="xl" />
        </Center>
      ) : (
        <ChakraCalendar
          w="100%"
          h="100%"
          p="20px"
          borderRadius="md"
          boxShadow="md"
          border="none"
          __css={{
            "& .react-calendar__tile": {
              height: "70px",
            },
            "& .recipient-visit-date:after": {
              content: "' ✅'",
            },
          }}
          defaultActiveStartDate={visitDates[0]}
          tileClassName={({ date, view }) => {
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            if (view === "month") {
              if (
                visitDates.some(
                  (recipientVisitDate) =>
                    recipientVisitDate.getDate() === day &&
                    recipientVisitDate.getMonth() === month &&
                    recipientVisitDate.getFullYear() === year
                )
              ) {
                return "recipient-visit-date";
              }
            }

            return null;
          }}
          onClickDay={(value) => {
            const year = value.getFullYear();
            const month = ("0" + (value.getMonth() + 1)).slice(-2);
            const day = ("0" + value.getDate()).slice(-2);
            const dateString = `${year}-${month}-${day}`;
            setSelectedVisitStringDate(dateString)
          }}
        />
      )}
    </VStack>
  );
};
