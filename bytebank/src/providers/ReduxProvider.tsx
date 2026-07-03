"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store"; // Verifique se o caminho pro seu store está correto

interface ReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}