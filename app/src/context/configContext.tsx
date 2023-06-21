import React, { ReactNode, createContext, useContext } from "react";
import { Extension, RuntimeConnector } from "@dataverse/runtime-connector";
import { Model, Output } from "../types";
import { getOutput } from "../utils/model";

interface ContextType {
  runtimeConnector: RuntimeConnector;
  appVersion: string;
  output: Output;
}

const runtimeConnector = new RuntimeConnector(Extension);
const appVersion = "0.0.1";
const output = getOutput();

const ConfigContext = createContext<ContextType>({} as ContextType);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigContext.Provider
      value={{
        runtimeConnector,
        appVersion,
        output,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
