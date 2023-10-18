import React from "react";
import NavSidebar from "./NavSidebar";
import HistoryRecord from "./HistoryRecord";
import Table from "./Table";
import {TableRow} from "./Table";
import agent from '../API/Agent'


function HistoryPage() {
  const [data, setData] = React.useState<TableRow[]>([]);

  React.useEffect(() => {
    agent.DashboardAPI.historyList()
    .then((fetchedData: TableRow[]) => {
        setData(fetchedData);
        console.log(fetchedData)
    });
}, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="dash-bg flex items-center justify-center">
          <div className="content-bg w-3/4 flex flex-col p-5 m-5 mr-20 items-start gap-x-64">

            
            <Table rows={data}/>
          </div>

          <div className="border-white border-l-2 h-full flex items-center relative bottom-10">
            <NavSidebar />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
