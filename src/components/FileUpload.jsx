import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFiles } from '../api';

const FileUpload = () => {
  const [salesFile, setSalesFile] = useState(null);
  const [stockFile, setStockFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!salesFile || !stockFile) {
      alert('Please upload both files!');
      return;
    }

    try {
      const response = await uploadFiles(salesFile, stockFile);
      const numberOfDays = response.number_of_days;
      navigate('/select', { state: { numberOfDays } });
    } catch (error) {
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-box">
        <h2>Upload Files</h2>
        <div className="file-section">
          <label>Upload Sales File:</label>
          <input type="file" onChange={(e) => setSalesFile(e.target.files[0])} />
        </div>
        <div className="file-section">
          <label>Upload Stock File:</label>
          <input type="file" onChange={(e) => setStockFile(e.target.files[0])} />
        </div>
        <button onClick={handleUpload}>Upload and Proceed</button>
      </div>
    </div>
  );
};

export default FileUpload;
