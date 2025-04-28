import axios from 'axios';

// const BASE_URL = 'http://localhost:8000'; // FastAPI URL
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const uploadFiles = async (salesFile, stockFile, days) => {
  const formData = new FormData();
  formData.append('sales_file', salesFile);
  formData.append('stock_file', stockFile);
  formData.append('days', days);

  const response = await axios.post(`${BASE_URL}/upload-files/`, formData);
  return response.data;
};

export const getOptions = async () => {
  const response = await axios.get(`${BASE_URL}/get-options/`);
  return response.data;
};

export const calculateDOI = async (selection) => {
  const response = await axios.post(`${BASE_URL}/calculate-doi/`, selection);
  return response.data;
};
