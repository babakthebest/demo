import React from "react";
import { Navigation } from "./navigationMenu";
import { ModeToggle } from "./modeToggle";

export default function MainHeader() {
  return (
    <div className="flex h-full w-full items-center justify-between bg-white bg-opacity-10 px-4 pt-1 shadow-md backdrop-blur-md">
      <Navigation />
      <ModeToggle />
    </div>
  );
}
