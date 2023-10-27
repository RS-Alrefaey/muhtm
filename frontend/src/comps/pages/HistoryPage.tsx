import React, { useEffect } from "react";
import NavSidebar from "../NavSidebar";
import Table from "../Table";
import { TableRow } from "../Table";
import agent from "../../API/Agent";

function HistoryPage() {
  const [data, setData] = React.useState<TableRow[]>([]);

  useEffect(() => {
    document.title = "التحليلات السابقة";
  }, []);

  React.useEffect(() => {
    agent.DashboardAPI.historyList().then((fetchedData: TableRow[]) => {
      setData(fetchedData);
      console.log(fetchedData);
    });
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="dash-bg flex items-center justify-center">
          <div className="content-bg w-3/4 flex flex-col p-5 m-10">
            <Table rows={data} />
          </div>

          <div
            className="divider h-full bg-black relative right-10"
            style={{ width: "1px" }}
          ></div>
          <div className="flex justify-center relative bottom-10 right-5">
            <NavSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
