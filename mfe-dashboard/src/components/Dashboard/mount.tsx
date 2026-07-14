"use client";

import "@/app/globals.css";
import { createRoot, type Root } from "react-dom/client";
import { Dashboard } from "./Dashboard";
import type { Transfer } from "@/types/transfer";

interface MountProps {
  transfers: Transfer[];
}

export function mount(el: HTMLElement, props: MountProps) {
  const root: Root = createRoot(el);
  root.render(<Dashboard {...props} />);

  return {
    update: (newProps: MountProps) => {
      root.render(<Dashboard {...newProps} />);
    },
    unmount: () => {
      root.unmount();
    },
  };
}