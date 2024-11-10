"use client";

import React, { useState, useContext } from "react";

export const TriggerUpdateContext = React.createContext<{
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const TriggerUpdateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trigger, setTrigger] = useState(false);

  return (
    <TriggerUpdateContext.Provider value={{ trigger, setTrigger }}>
      {children}
    </TriggerUpdateContext.Provider>
  );
};

export const useTriggerUpdate = () => {
  const context = useContext(TriggerUpdateContext);
  if (!context) {
    throw new Error(
      "useTriggerUpdate must be used within a TriggerUpdateProvider"
    );
  }
  return context;
};
