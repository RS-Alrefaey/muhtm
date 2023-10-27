import React, { useState } from "react";
import uploadImage from "./images/uploadIcon.png";
import agent, { UploadDatasetType } from "../API/Agent";

type ResponseType = {
  dataset: any;
  analyzed_data: any;
};

type UploadBtnProps = {
  onSuccess: (id: string) => void;
};

function CloseButton({
  onClose,
  resetCategory,
  resetFile,
  resetErrors,
}: {
  onClose: () => void;
  resetCategory: () => void;
  resetFile: () => void;
  resetErrors: () => void;
}) {
  return (
    <button
      className="absolute top-2 right-2 text-blue-950 text-4xl "
      onClick={() => {
        resetCategory();
        resetFile();
        resetErrors();
        onClose();
      }}
    >
      &times;
    </button>
  );
}

function UploadBtn({ onSuccess }: UploadBtnProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [inputKey, setInputKey] = useState(Date.now());

  const [category, setCategory] = useState<
    UploadDatasetType["store_category"] | null
  >(null);

  const [file, setFile] = useState<File | null>(null);

  const [fileError, setFileError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const resetCategory = () => setCategory(null);
  const resetFile = () => setFile(null);
  const resetErrors = () => {
    setFileError(null);
    setCategoryError(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!["csv", "xls", "xlsx"].includes(fileExtension!)) {
        setFileError("Excel أو CSV الرجاء رفع ملف ");
        setFile(null);
        return;
      }

      setFileError(null);
      setFile(file);
    }
  };

  const handleUpload = async () => {
    let hasErrors = false;

    if (!file) {
      setFileError("Excel أو CSV الرجاء رفع ملف ");
      hasErrors = true;
      return;
    }

    if (!category) {
      setCategoryError("الرجاء تحديد فئة");
      hasErrors = true;
      return;
    }

    if (hasErrors) return;

    const formData = new FormData();
    formData.append("dataset", file as File);
    formData.append("store_category", category);

    try {
      const response = (await agent.DashboardAPI.upload(
        formData
      )) as ResponseType;
      console.log("Upload successful", response);
      setShowModal(false);
      console.log(response.dataset);
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
        onClick={() => {
          setInputKey(Date.now());
          setShowModal(true);
        }}
      >
        <img src={uploadImage} alt="Icon" className="w-8 h-8 flex mr-2" />
        تحليل جديد
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/4 space-y-4 relative flex flex-col justify-center items-center">
            <CloseButton
              onClose={() => setShowModal(false)}
              resetCategory={resetCategory}
              resetFile={resetFile}
              resetErrors={resetErrors}
            />
            <h1 className="text-gray-600">Excel أو CSV الرجاء رفع ملف </h1>

            <div className="flex justify-center relative left-14">
              <input type="file" key={inputKey} onChange={handleFileChange} />
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
            {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
            {categoryError && (
              <p className="text-red-500 mb-2">{categoryError}</p>
            )}

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
