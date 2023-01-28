import { Response } from "express";
import { dependencyInjectionContainerFactory } from "./dependencyInjectionContainer";

export interface ResponseWithDependencyInjection extends Response {
  locals: {
    dependencyInjection: ReturnType<typeof dependencyInjectionContainerFactory>;
  }
}