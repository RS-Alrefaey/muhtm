import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import agent, { BarChartArrayType } from "../API/Agent";

Chart.register(CategoryScale);

type BarChartProps = {
  data: BarChartArrayType;
};

function BarChart({ data }: BarChartProps) {
  const allKeys = Object.keys(data);
  const firstEightKeys = allKeys.slice(0, 8);

  const positiveKeys = firstEightKeys.filter((key) =>
    key.endsWith("_positive")
  );
  const negativeKeys = firstEightKeys.filter((key) =>
    key.endsWith("_negative")
  );

  const positiveValues = positiveKeys.map(
    (key) => data[key as keyof typeof data]
  );
  const negativeValues = negativeKeys.map(
    (key) => data[key as keyof typeof data]
  );

  const keyAliases: { [key: string]: string } = {
    size_positive: "الحجم",
    size_negative: "الحجم ",
    color_positive: "اللون ",
    color_negative: "اللون ",
    style_positive: "الأسلوب ",
    style_negative: "الأسلوب ",
    fabric_positive: "النسيج ",
    fabric_negative: "النسيج ",
    quality_positive: "الجودة ",
    quality_negative: "الجودة ",
    price_positive: "السعر ",
    price_negative: "السعر ",
    usage_positive: "الاستخدام ",
    usage_negative: "الاستخدام ",
  };

  const chartData = {
    labels: positiveKeys.map((key) => keyAliases[key] || key.split("_")[0]),
    datasets: [
      {
        label: "التقييمات الإيجابية",
        data: positiveValues,
        backgroundColor: "#001B48",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: "التقييمات السلبية",
        data: negativeValues,
        backgroundColor: "#858585",
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <Bar
      data={chartData}
      options={{ ...chartOptions, maintainAspectRatio: false }}
    />
  );
}

export default BarChart;
