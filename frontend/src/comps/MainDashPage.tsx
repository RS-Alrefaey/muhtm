import React, { useEffect, useState } from "react";
import NavSidebar from "./NavSidebar";
import UploadBtn from "./UploadBtn";
import agent, { BarChartArrayType, MainDashDisplayType } from "../API/Agent";
import Charts from "./Charts";
import { useLocation } from "react-router-dom";
import ExportButton from "./ExportButton";

function MainDashPage() {
  const location = useLocation();
  const chartRef = React.useRef<HTMLDivElement>(null);

  const [hasPreviousAnalysis, setHasPreviousAnalysis] = useState<
    boolean | null
  >(null);
  const [data, setData] = useState<BarChartArrayType>();
  const [analyzedDataId, setAnalyzedDataId] = useState<string | null>(null);
  const [analysisDate, setAnalysisDate] = useState<Date | null>(null);

  const fetchAndSetAnalysisData = async () => {
    try {
      const response: MainDashDisplayType = await agent.DashboardAPI.hasPreviousAnalysis();
      setHasPreviousAnalysis(response.has_previous_analysis);
      setData(response.analysis_data);
      if (response.analysis_date) {
        setAnalysisDate(new Date(response.analysis_date));
      }
    } catch (error) {
      console.error("Failed to fetch analysis status.", error);
    }
  };
  

  const handleUploadSuccess = (id: string): void => {
    setAnalyzedDataId(id);
    setHasPreviousAnalysis(true);
    fetchAndSetAnalysisData();
  };

  useEffect(() => {
    fetchAndSetAnalysisData();
  }, [location.pathname]);
  

  useEffect(() => {
    if (!analyzedDataId) return;

    agent.DashboardAPI.chart(analyzedDataId)
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  }, [analyzedDataId]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="dash-bg flex items-center justify-center">
          <div className="content-bg w-3/4 flex flex-col p-5 m-5 mr-20">
            {hasPreviousAnalysis ? (
              <>
                <h2 className="text-center text-lg mb-4 font-cursive text-gray-500">
                  {analysisDate
                    ? analysisDate.toISOString().split("T")[0]
                    : "Loading..."}
                </h2>

                <div className="flex-grow w-full" ref={chartRef}>
                  <Charts data={data} />
                </div>
                <div className="flex justify-center mt-4 items-center">
                  <ExportButton targetRef={chartRef} />

                  <div>
                    <UploadBtn onSuccess={handleUploadSuccess} />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center flex-grow flex-col gap-y-5">
                <h2 className="text-center text-3xl mb-4 font-cursive text-gray-500">
                  ابدأ رحلتك وقم بعمل أول تحليل
                </h2>
                <div>
                  <UploadBtn onSuccess={handleUploadSuccess} />
                </div>
              </div>
            )}
          </div>
          <div className="border-white border-l-2 h-full flex items-center relative bottom-10">
            <NavSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainDashPage;
