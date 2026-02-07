"use client";

import { createContext, useContext } from "react";

type UserContextType = {
  author: string;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");

  return context;
};
