import app from "../../output/app.json";
import { Model, Output } from "../types";

export function getModelByName(modelName: string) {
  return app.createDapp.streamIDs.find(
    (model) => model.name === modelName
  ) as Model;
}

export function getOutput(): Output {
  return app as Output;
}
