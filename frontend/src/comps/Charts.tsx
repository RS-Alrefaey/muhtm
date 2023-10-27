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
      <div className="flex flex-col w-full h-full px-8 py-1 space-y-6">
        <div className="flex justify-end items-center space-x-6">
          <div className="w-80 box-b relative flex justify-center">
            <h1 className="text-lg font-bold text-blue-950 font-cursive absolute top-2 left-52 ">
              رضا العملاء
            </h1>
            <div className="relative">
              <h1 className="text-3xl font-bold text-blue-950 font-cursive absolute top-16 left-32">
                {(
                  (data.general_positive /
                    (data.general_positive + data.general_negative)) *
                  100
                ).toFixed(2)}
                %
              </h1>
            </div>
            <div className=" p-2 w-44 h-36 relative top-2 right-16">
              <DoughnutChart data={data} />
            </div>
          </div>

          <div className="flex flex-col text-right justify-center box-b w-36 h-36 p-4">
            <h1 className="text-lg font-bold text-blue-950 font-cursive relative bottom-6">
              عدد التعليقات
            </h1>
            <h1 className="text-5xl font-bold text-blue-950 font-cursive">
              {lastValue as number}
            </h1>
          </div>
        </div>

        <div className="flex w-full h-3/4 box-b p-2 relative ">
          <h1 className="text-lg font-bold text-blue-950 font-cursive absolute right-4">
            احصائيات اراء العملاء
          </h1>

          <BarChart data={data} />
        </div>
      </div>
    </>
  );
}

export default Charts;
