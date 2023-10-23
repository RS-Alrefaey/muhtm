import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import agent, { BarChartArrayType } from "../API/Agent";
import Charts from "./Charts";
import backBtn from "./backBtn.png";
import ExportButton from "./ExportButton";


export type TableRow = {
  id: number;
  store_category: string;
  general_positive_percentage: number | null;
  date: string;
};

type TableProps = {
  rows: TableRow[];
};

const TABLE_HEAD: string[] = [
  "",
  "التصنيف",
  "نسبة رضا العملاء",
  "تاريخ التحليل",
];

export default function TableWithStripedRows({
  rows,
}: TableProps): JSX.Element {
  const [data, setData] = useState<BarChartArrayType | null>(null);
  const [showTable, setShowTable] = React.useState(true);
  const chartRef = React.useRef<HTMLDivElement>(null);


  const detailsHandler =
    (rowId: number) => (event: React.MouseEvent<any, MouseEvent>) => {
      event.preventDefault();
      setShowTable(false); 

      agent.DashboardAPI.chart(rowId.toString())
        .then((response) => {
          setData(response);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching chart data:", error);
        });
    };

  const CATEGORY_ALIAS: { [key: string]: string } = {
    CLOTHES: "ملابس",
    ELECTRONIC: "الكترونيات",
  };



  return (
    <>
      {showTable ? (
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 font-cursive mid-blue-font"
                  >
                    <Typography
                      color="blue-gray"
                      className="font-extrabold leading-none opacity-70 text-xl"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(
                (
                  { id, store_category, general_positive_percentage, date },
                  index
                ) => (
                  <tr
                    key={id}
                    className={index % 2 === 0 ? "bg-blue-gray-50" : ""}
                  >
                    {" "}
                    <td className="p-4">
                      {general_positive_percentage !== null ? (
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium text-blue-950"
                          onClick={detailsHandler(id)}
                        >
                          لرؤية التفاصيل
                        </Typography>
                      ) : (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium text-gray-500"
                        >
                          لا توجد تفاصيل
                        </Typography>
                      )}
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold font-cursive text-blue-950 text-lg "
                      >
                        {CATEGORY_ALIAS[store_category] || store_category}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={
                          general_positive_percentage !== null 
                          ? "font-extrabold font-cursive text-blue-950 text-lg" 
                          : "font-extrabold font-cursive text-gray-500 text-lg"
                      }
                      >
                        {general_positive_percentage !== null
                          ? Number(general_positive_percentage).toFixed(2) + "%"
                          : "غير معرّف"}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-extrabold font-cursive text-blue-950 text-lg "
                      >
                        {date}
                      </Typography>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>{" "}
        </Card>
      ) : (
        <>
        {data && <div ref={chartRef} className="flex-grow w-full"><Charts data={data} /></div>}
          {console.log(data)}
          <div className="">
            <img
              src={backBtn}
              alt="Description of Image"
              className="w-6 h-6 absolute right-[360px] top-[120px] hover:cursor-pointer"
              onClick={() => {
                setShowTable(true);
                setData(null);
              }}
            />
          </div>
          <div className="flex w-full justify-center">
          <ExportButton targetRef={chartRef} />

          </div>

        </>
      )}
    </>
  );
}
