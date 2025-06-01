"use client";
import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { Next13ProgressBar } from "next13-progressbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextUIProvider>
        {children}
      </NextUIProvider>
      <Next13ProgressBar
        height="4px"
        color="rgb(147 51 234 / var(--tw-bg-opacity))"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  );
}
