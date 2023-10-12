import React, { useState } from 'react';
import uploadImage from './uploadIcon.png';
import agent, { UploadDatasetType } from '../API/Agent'



function UploadBtn() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const [category, setCategory] = useState<UploadDatasetType['store_category'] | null>(null);
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
    formData.append('dataset', file); 
    formData.append('store_category', category);

    try {
        const response = await agent.DashboardAPI.upload(formData); 
        console.log('Upload successful', response);
        setShowModal(false);
        
    } catch (error) {
        console.error('Upload failed', error);
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
                    <div className="bg-white p-6 rounded shadow-lg w-1/3 space-y-4">
                        <input type="file" onChange={handleFileChange} />

                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="clothes"
                                    checked={category === 'CLOTHES'}
                                    onChange={() => setCategory('CLOTHES')}
                                    className="mr-2"
                                />
                                Clothes
                            </label>

                            <label className="ml-4">
                                <input
                                    type="radio"
                                    value="electronics"
                                    checked={category === 'ELECTRONIC'}
                                    onChange={() => setCategory('ELECTRONIC')}
                                    className="mr-2"
                                />
                                Electronics
                            </label>
                        </div>

                        <button
                            className="button-secondary border-dashed flex items-center"
                            onClick={handleUpload}
                        >
                            Confirm Upload
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadBtn;

