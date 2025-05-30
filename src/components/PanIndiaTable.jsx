import React from 'react';

const PanIndiaTable = ({ data, mode }) => {
  const headers = mode === 'City Wise'
    ? ['City', 'Units', 'Sales (Qty) - Units', 'DOI']
    : ['SKU Name', 'Units', 'Sales (Qty) - Units', 'DOI'];

  return (
    <div className="results-page">
      <div className="results-box-pan-india">
        <h2 className="results-heading">
          PAN India DOI - {mode === 'City Wise' ? 'City Wise' : 'Product Wise'}
        </h2>
        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                {headers.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  {headers.map((col, i) => (
                    <td key={i}>{row[col]}</td>
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

export default PanIndiaTable;
