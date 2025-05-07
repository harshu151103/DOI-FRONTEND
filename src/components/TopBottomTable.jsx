import React from 'react';
import '../App.css';

const TopBottomTable = ({ top10, bottom10, numberOfDays }) => {
  const renderTable = (data, title) => (
    <div className="results-box-top-bottom" style={{ width: '48%' }}>
      <h2 className="results-heading">{title}</h2>
      <div className="table-wrapper">
        <table className="results-table">
          <thead>
            <tr>{Object.keys(data[0] || {}).map((col, idx) => <th key={idx}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="results-page" style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {renderTable(top10, `Top 10 DOI (Last ${numberOfDays} Days)`)}
      {renderTable(bottom10, `Bottom 10 DOI (Last ${numberOfDays} Days)`)}
    </div>
  );
};

export default TopBottomTable;
