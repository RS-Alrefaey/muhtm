import React, { useState } from "react";

const UploadCSV: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("csv", file);

    const response = await fetch("http://localhost:8000/generate-json/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const jsonData = await response.json();
      // Now jsonData is the JSON data from your server,
      // you can handle it according to your needs,
      // like updating the state or more.
      console.log(jsonData);
    } else {
      console.error("Server error:", response);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFile(fileList[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type="submit">Upload CSV</button>
    </form>
  );
};

export default UploadCSV;
