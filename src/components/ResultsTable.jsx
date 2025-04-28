import React from 'react';

const ResultsTable = ({ results }) => {
  return (
    <div className="results-page">
      <div className="results-box">
        <h2 className="results-heading">DOI TABLE</h2>
        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                {Object.keys(results[0] || {}).map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
