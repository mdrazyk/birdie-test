import * as express from "express";
import { ResponseWithDependencyInjection } from "../types";
import { getRecipientTimelineForDateSchema } from "./recipient.validation";

export const recipientController = express.Router();

recipientController.get(
  "/recipients/all",
  async (_, res: ResponseWithDependencyInjection, next) => {
    try {
      const { recipientService } = res.locals.dependencyInjection;

      const recipients = await recipientService.getRecipients();
      res.status(200).json(recipients);
    } catch (error) {
      next(error);
    }
  }
);

recipientController.get(
  "/recipients/:recipientId/visit-dates",
  async (req, res: ResponseWithDependencyInjection, next) => {
    try {
      const { recipientId } = req.params;
      const { recipientService } = res.locals.dependencyInjection;

      const recipients = await recipientService.getRecipientVisitDates(
        recipientId
      );
      res.status(200).json(recipients);
    } catch (error) {
      next(error);
    }
  }
);

recipientController.get(
  "/recipients/:recipientId/timeline",
  async (req, res: ResponseWithDependencyInjection, next) => {
    try {
      const { recipientId } = req.params;
      const { visitDateString } =
        await getRecipientTimelineForDateSchema.validate(req.query);

      const { recipientService } = res.locals.dependencyInjection;

      const timelineForDate =
        await recipientService.getRecipientTimelineForDate({
          recipientId,
          visitDateString,
        });

      res.status(200).json(timelineForDate);
    } catch (error) {
      next(error);
    }
  }
);
