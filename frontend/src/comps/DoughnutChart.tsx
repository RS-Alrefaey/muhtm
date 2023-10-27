import React, { useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import agent, { BarChartArrayType } from "../API/Agent";

Chart.register(CategoryScale);

type DoughnutChartProps = {
  data: BarChartArrayType;
};

function DoughnutChart({ data }: DoughnutChartProps) {
  const allKeys = Object.keys(data);
  const relevantKeys = allKeys.slice(8, 10);

  const relevantValues = relevantKeys.map(
    (key) => data[key as keyof typeof data]
  );

  const keyAliases: { [key: string]: string } = {
    general_positive: "إيجابي",
    general_negative: "سلبي",
  };

  const chartData = {
    labels: relevantKeys.map((key) => keyAliases[key]),
    datasets: [
      {
        data: relevantValues,
        backgroundColor: ["#001B48", "#858585"],
      },
    ],
  };

  return (
    <Doughnut
      data={chartData}
      options={{
        plugins: {
          legend: {
            position: "left",
            labels: {
              padding: 10,
            },
          },
        },
        layout: {
          padding: {
            left: -10,
          },
        },
        maintainAspectRatio: false,
      }}
    />
  );
}

export default DoughnutChart;
