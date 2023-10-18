import React from "react";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";

import agent, { BarChartArrayType } from "../API/Agent";

export type ChartsProps = {
  data: BarChartArrayType | undefined;
};

function Charts({ data }: ChartsProps) {
  if (!data) {
    return <p className="flex justify-center">جاري المعالجة</p>;
  }
  const allKeys = Object.keys(data);
  const lastKey = allKeys[allKeys.length - 1];
  const lastValue = data[lastKey as keyof typeof data];

  return (
    <>
      <div className="flex flex-col w-fit">
        <div className="flex justify-center items-center">
          <div className="w-44">
            <DoughnutChart data={data} />
          </div>
          <div className="flex justify-center">
            <h1 className="text-3xl">{lastValue as number}</h1>
          </div>
        </div>

        <div>
          <BarChart data={data} />
        </div>
      </div>
    </>
  );
}

export default Charts;
