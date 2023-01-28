import { BusinessLogicError } from "../error";

export class RecipientError extends BusinessLogicError {
  constructor(message: string) {
    super(message);
    this.name = "RecipientError";
  }
}