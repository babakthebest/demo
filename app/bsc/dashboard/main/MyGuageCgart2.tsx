"use client";
import * as d3 from "d3"; // Import d3
import dynamic from "next/dynamic";
import GaugeComponent from "react-gauge-component";

// const GaugeComponent = dynamic(() => import("react-gauge-component"), { ssr: false });

export default function MyGuageChart2() {
  return (
    <div>
      <GaugeComponent
        id="gauge-component4"
        arc={{
          gradient: false,
          width: 0.1,
          padding: 0,
          subArcs: [
            {
              limit: 30,
              color: "#EA4228",
              showTick: true,
            },
            {
              limit: 70,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 100,
              color: "#5BE12C",
              showTick: true,
            },
            // {
            //   limit: 75,
            //   color: "#F5CD19",
            //   showTick: true,
            // },
            { color: "#EA4228" },
          ],
        }}
        value={30}
        pointer={{ type: "arrow", elastic: true }}
      />
    </div>
  );
}
