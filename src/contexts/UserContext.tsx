"use client";

import { createContext, useContext } from "react";
import type { User } from "@/lib/auth";

const UserContext = createContext<User | null | undefined>(undefined);

type UserProviderProps = {
  user: User | null;
  children: React.ReactNode;
};

export function UserProvider({ user, children }: UserProviderProps) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
