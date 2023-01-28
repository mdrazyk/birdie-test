import * as yup from "yup";

export const getRecipientTimelineForDateSchema = yup.object().shape({
  visitDateString: yup.string().required(),
});
