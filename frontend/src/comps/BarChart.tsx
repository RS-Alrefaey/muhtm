import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import agent, { BarChartArrayType } from '../API/Agent';

Chart.register(CategoryScale);

type BarChartProps = {
  data: BarChartArrayType;
};

function BarChart({ data }: BarChartProps) {
  const allKeys = Object.keys(data);
  const firstEightKeys = allKeys.slice(0, 8); 

  const positiveKeys = firstEightKeys.filter(key => key.endsWith('_positive'));
  const negativeKeys = firstEightKeys.filter(key => key.endsWith('_negative'));

  const positiveValues = positiveKeys.map(key => data[key as keyof typeof data]);
  const negativeValues = negativeKeys.map(key => data[key as keyof typeof data]);

  const keyAliases: { [key: string]: string } = {
    size_positive: "الحجم",
    size_negative: "الحجم ",
    color_positive: "اللون ",
    color_negative: "اللون ",
    style_positive: "الأسلوب ",
    style_negative: "الأسلوب ",
    fabric_positive: "النسيج ",
    fabric_negative: "النسيج ",
    // Add other mappings as needed
  };

  const chartData = {
    labels: positiveKeys.map(key => keyAliases[key] || key.split('_')[0]), 
    datasets: [
      {
        label: 'التقييمات الإيجابية',
        data: positiveValues,
        backgroundColor: '#001B48', 
      },
      {
        label: 'التقييمات السلبية',
        data: negativeValues,
        backgroundColor: '#858585', 
      }
    ],
  };

  const chartOptions = {
    scales: {
        x: {
            grid: {
                display: false 
            }
        },
        y: {
            grid: {
                display: false 
            },
            beginAtZero: true, 
        }
    }
};
    return <Bar data={chartData} options={chartOptions} />;

}

export default BarChart;

