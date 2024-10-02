"use client";
import * as d3 from "d3"; // Import d3
import dynamic from "next/dynamic";
import GaugeComponent from "react-gauge-component";

// const GaugeComponent = dynamic(() => import("react-gauge-component"), { ssr: false });

export default function MyGuageChart() {
  return (
    <div>
      <GaugeComponent
        arc={{
          subArcs: [
            {
              limit: 20,
              color: "#EA4228",
              showTick: true,
            },
            {
              limit: 40,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 60,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 100,
              color: "#5BE12C",
              showTick: true,
            },
          ],
        }}
        value={80}
      />
    </div>
  );
}
