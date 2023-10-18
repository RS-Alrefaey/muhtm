import React, { useState } from "react";
import uploadImage from "./uploadIcon.png";
import agent, { UploadDatasetType } from "../API/Agent";
import { relative } from "path";

type ResponseType = {
  dataset: any; // replace 'any' with the appropriate type if known
  analyzed_data: any; // replace 'any' with the appropriate type if known
};

type UploadBtnProps = {
  onSuccess: (id: string) => void;
};

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      className="absolute top-2 right-2 text-blue-950 text-4xl "
      onClick={onClose}
    >
      &times;
    </button>
  );
}

function UploadBtn({ onSuccess }: UploadBtnProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [category, setCategory] = useState<
    UploadDatasetType["store_category"] | null
  >(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !category) {
      console.error("File or category not selected");
      return;
    }

    const formData = new FormData();
    formData.append("dataset", file);
    formData.append("store_category", category);

    try {
      const response = (await agent.DashboardAPI.upload(
        formData
      )) as ResponseType;
      console.log("Upload successful", response);
      setShowModal(false);
      const analyzedDataId = response.analyzed_data.id;
      onSuccess(analyzedDataId);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div>
      <button
        className="button-secondary border-dashed flex items-center"
        onClick={() => setShowModal(true)}
      >
        <img src={uploadImage} alt="Icon" className="w-8 h-8 flex mr-2" />
        تحليل جديد
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/4 space-y-4 relative flex flex-col justify-center items-center">
            <CloseButton onClose={() => setShowModal(false)} />
            <h1 className="text-gray-600">Excel أو CSV الرجاء رفع ملف </h1>

            <div className="flex justify-center relative left-14">
              <input type="file" onChange={handleFileChange} />
            </div>
            <h1 className="text-gray-600">:الرجاء تحديد فئة التعليقات </h1>

            <div className="flex gap-x-3 justify-center">
              <label>
                ملابس
                <input
                  type="radio"
                  value="clothes"
                  checked={category === "CLOTHES"}
                  onChange={() => setCategory("CLOTHES")}
                  className="ml-2"
                />
              </label>

              <label className="ml-4 ">
                إلكترونيات
                <input
                  type="radio"
                  value="electronics"
                  checked={category === "ELECTRONIC"}
                  onChange={() => setCategory("ELECTRONIC")}
                  className="ml-2"
                />
              </label>
            </div>

            <button
              className="button-prim flex items-center"
              onClick={handleUpload}
            >
              قم بالتحميل
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadBtn;
