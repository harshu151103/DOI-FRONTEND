import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFiles } from '../api';

const FileUpload = () => {
  const [salesFile, setSalesFile] = useState(null);
  const [stockFile, setStockFile] = useState(null);
  const [days, setDays] = useState(30);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!salesFile || !stockFile) {
      alert('Please upload both files!');
      return;
    }
    await uploadFiles(salesFile, stockFile, days);
    navigate('/select');
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
        <div className="file-section">
          <label>Number of Days:</label>
          <input
            type="number"
            placeholder="Enter number of days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <button onClick={handleUpload}>Upload and Proceed</button>
      </div>
    </div>
  );
};

export default FileUpload;
