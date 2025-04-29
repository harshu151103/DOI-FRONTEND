import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import SelectionPage from './components/SelectionPage';
import ResultsTable from './components/ResultsTable';

const ResultsWrapper = ({ results }) => {
  const location = useLocation();
  const numberOfDays = location.state?.numberOfDays || 0;
  return <ResultsTable results={results} numberOfDays={numberOfDays} />;
};

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/select" element={<SelectionPage setResults={setResults} />} />
        <Route path="/results" element={<ResultsWrapper results={results} />} />
      </Routes>
    </Router>
  );
};

export default App;
