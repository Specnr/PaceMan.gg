"use client";
import * as React from "react";
import { Suspense } from "react";

import { HeroUIProvider } from "@heroui/react";
import { Next13ProgressBar } from "next13-progressbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeroUIProvider>
        {children}
      </HeroUIProvider>
      <Suspense fallback={null}>
        <Next13ProgressBar
          height="4px"
          color="rgb(147 51 234 / var(--tw-bg-opacity))"
          options={{ showSpinner: false }}
          showOnShallow
        />
      </Suspense>
    </>
  );
}
