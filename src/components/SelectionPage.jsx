import React, { useState, useEffect } from 'react';
import { getOptions, calculateDOI } from '../api';
import MultiSelectDropdown from './MultiSelectDropdown';
import ResultsTable from './ResultsTable';
import TopBottomTable from './TopBottomTable';
// import './SelectionPage.css';

const SelectionPage = ({ setResults }) => {
  const [cities, setCities] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [navbarAtTop, setNavbarAtTop] = useState(false);
  const [doiResults, setDoiResults] = useState(null);
  const [topBottomResults, setTopBottomResults] = useState(null);
  // const [numberOfDays, setNumberOfDays] = useState(0);
  const numberOfDays = 7; // or any default value


  useEffect(() => {
    async function fetchOptions() {
      const data = await getOptions();
      setCities(data.cities);
      setProducts(['All Products', ...data.products]);
    }
    fetchOptions();
  }, []);

  // Stick navbar to top when any selection is made or top/bottom button is clicked
  useEffect(() => {
    const shouldStick = selectedCities.length > 0 || selectedProduct || topBottomResults;
    setNavbarAtTop(shouldStick);
  }, [selectedCities, selectedProduct, topBottomResults]);

  // Auto-fetch DOI data when both city and product are selected
  useEffect(() => {
    const fetchDOI = async () => {
      if (selectedCities.length > 0 && selectedProduct) {
        const payload = {
          selected_city: selectedCities,
          selected_product: selectedProduct,
        };
        const res = await calculateDOI(payload);
        setDoiResults(res);
        setTopBottomResults(null); // Hide top-bottom results if switching back
      } else {
        setDoiResults(null); // Clear if incomplete selection
      }
    };
    fetchDOI();
  }, [selectedCities, selectedProduct]);

  const handleTopBottomDOI = async () => {
    const response = await fetch("http://localhost:8000/top-bottom-doi/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: selectedCities,
        products: selectedProduct,
        days: numberOfDays,
      }),
    });
    const data = await response.json();
    setTopBottomResults({ top10: data.top_10, bottom10: data.bottom_10 });
    setDoiResults(null); // Hide regular DOI results
  };

  return (
    <div className="selection-container">
      <div className={`navbar ${navbarAtTop ? 'navbar-top' : 'navbar-center'}`}>
        <h1 className="dashboard-title">
          DOI DASHBOARD {numberOfDays > 0 ? `FOR LAST ${numberOfDays} DAYS` : ''}
        </h1>

        <div className={`options-row ${navbarAtTop ? 'gap-large' : 'gap-small'}`}>
          <MultiSelectDropdown
            options={cities}
            selectedOptions={selectedCities}
            setSelectedOptions={(options) => {
              setSelectedCities(options);
              setTopBottomResults(null); // reset if user switches selection
            }}
            placeholder="Select Cities"
          />
          <select
            value={selectedProduct}
            onChange={(e) => {
              setSelectedProduct(e.target.value);
              setTopBottomResults(null); // reset if user switches selection
            }}
            className="select-input"
          >
            <option value="">Select Product</option>
            {products.map((product, idx) => (
              <option key={idx} value={product}>{product}</option>
            ))}
          </select>

          <button onClick={handleTopBottomDOI}>TOP AND BOTTOM 10 DOI</button>
        </div>
      </div>

      <div className="results-section">
        {doiResults && <ResultsTable results={doiResults} numberOfDays={numberOfDays} />}
        {topBottomResults && (
          <TopBottomTable
            top10={topBottomResults.top10}
            bottom10={topBottomResults.bottom10}
            numberOfDays={numberOfDays}
          />
        )}
      </div>
    </div>
  );
};

export default SelectionPage;
