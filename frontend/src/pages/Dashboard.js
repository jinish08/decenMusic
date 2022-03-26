import React from "react";
import { Box } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SidebarWithHeader.tsx";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const barColors = ["#92A3FD", "#C58BF2"];
let renderLabel = function (entry) {
  return entry.name;
};

const color1 = ["#92A3FD", "#9DCEFF"];
const color2 = ["#C58BF2", "#EEA4CE"];

const Dashboard = () => {
  let data1 = [
    { name: "Exercise 1", value: 97 },
    { name: "Exercise 2", value: 1 },
    { name: "Exercise 3", value: 12 },
    { name: "Exercise 4", value: 4 },
  ];

    
const data2 = [
    {
      name: "Day 1",
      Time: 23,
    },
    {
      name: "Day 2",
      Time: 22,
    },
    {
      name: "Day 3",
      Time: 11,
    },
    {
      name: "Day 4",
      Time:  14,
    },
    {
      name: "Day 5",
      Time:   18,
    },
    {
      name: "Day 6",
      Time:  19,
    },
    {
      name: "Day 7",
      Time: 10,
    },
  ];
  
  return (
    <>
      <Box position="absolute" width="full" zIndex="-1">
        <SidebarWithHeader />
      </Box>
      <Box postion="absolute" pl="16%" pt="20" zIndex="10">
        <div zIndex="10">
          <PieChart width={400} height={400} zIndex="10">
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data1}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={renderLabel}
            >
              {data1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 2]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div>
      <BarChart
        width={700}
        height={300}
        data={data2}
        barCategoryGap={15}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        padding={{
          right: 30,
          left: 20,
        }}
      >
        <defs>
          <linearGradient
            id="colorUv"
            x1="100%"
            y1="100%"
            x2="0%"
            y2="100%"
            spreadMethod="reflect"
          >
            <stop offset="0" stopColor="#C58BF2" />
            <stop offset="1" stopColor="#EEA4CE" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis dataKey="Time" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Time" /*fill="url(#colorUv)"*/ radius={[20, 20, 20, 20]}>
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[0]} />
          ))}
        </Bar>
        <Bar dataKey="Time" /*fill="url(#colorUv)"*/ radius={[20, 20, 20, 20]}>
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[1]} />
          ))}
        </Bar>
      </BarChart>
    </div>
      </Box>
    </>
  );
};

export default Dashboard;
