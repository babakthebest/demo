import React from "react";
import { Navigation } from "./navigationMenu";
import { ModeToggle } from "./modeToggle";

export default function MainHeader() {
  return (
    <div className="mx-2 flex justify-between pt-1">
      <Navigation />
      <ModeToggle />
    </div>
  );
}
