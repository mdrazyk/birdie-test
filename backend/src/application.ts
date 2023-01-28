import * as express from "express";
import * as cors from "cors";
import { pingController } from "./controllers/ping";
import { dependencyInjectionContainerFactory } from "./dependencyInjectionContainer";
import { recipientController } from "./recipient/recipient.controller";
import { BusinessLogicError } from "./error";
import { ValidationError } from "yup";

const _dependencyInjectionContainer = dependencyInjectionContainerFactory();

export const appFactory = (
  dependencyInjectionContainer = _dependencyInjectionContainer
) => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((_, res, next) => {
    res.locals.dependencyInjection = dependencyInjectionContainer;
    next();
  });

  app.use(pingController);
  app.use(recipientController);

  app.use(
    (
      err: express.ErrorRequestHandler,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (err instanceof BusinessLogicError || err instanceof ValidationError) {
        res.status(400).json({ message: err.message });
        return;
      }

      next(err);
    }
  );

  return app;
};
