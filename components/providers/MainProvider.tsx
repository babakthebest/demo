"use client";
import * as React from "react";
import { ThemeProvider } from "./theme-provider";

export function MainProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div {...props}>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </div>
  );
}
