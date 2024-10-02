"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
const data = [
  {
    date: "babak",
    value: 4000,
    target: 2400,
    amt: 2400,
  },
  {
    date: "1402/07",
    value: 3000,
    target: 1398,
    amt: 2210,
  },
  {
    date: "1402/08",
    value: 2000,
    target: 9800,
    amt: 2290,
  },
  {
    date: "1402/09",
    value: 2780,
    target: 3908,
    amt: 2000,
  },
  {
    date: "1402/10",
    value: 1890,
    target: 4800,
    amt: 2181,
  },
  {
    date: "1402/11",
    value: 2390,
    target: 3800,
    amt: 2500,
  },
  {
    date: "1402/12",
    value: 3490,
    target: 4300,
    amt: 2100,
  },
];

export default function MyBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" content={<CustomizedLegend />} />
        <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />}>
          <LabelList dataKey="value" position="top" />
        </Bar>
        <Bar dataKey="target" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        {/* <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }}>
          <LabelList dataKey="value" position="bottom" />
        </Line>
        <Line type="monotone" dataKey="target" stroke="#82ca9d">
          <LabelList dataKey="target" position="bottom" />
        </Line> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomizedLegend = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h4>Custom Legend Title</h4> {/* Adding a custom title */}
      <p style={{ color: "gray" }}>Description about the chart</p>
    </div>
  );
};
