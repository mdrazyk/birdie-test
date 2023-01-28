import { RecipientError } from "./recipient.error";
import { recipientRepositoryFactory } from "./recipient.repository";

export const recipientServiceFactory = ({
  recipientsRepository,
}: {
  recipientsRepository: ReturnType<typeof recipientRepositoryFactory>;
}) => {
  return {
    getRecipients: () => recipientsRepository.getRecipients(),

    getRecipientVisitDates: (recipientId: string) =>
      recipientsRepository.getRecipientVisitDates(recipientId),

    getRecipientTimelineForDate: ({
      recipientId,
      visitDateString,
    }: {
      recipientId: string;
      visitDateString: string;
    }) => {
      const visitDate = new Date(visitDateString);

      if (visitDate.toString() === "Invalid Date") {
        throw new RecipientError("Cannot parse visit date");
      }

      return recipientsRepository.getRecipientTimelineForDate({
        recipientId,
        visitDate,
      });
    },
  };
};
