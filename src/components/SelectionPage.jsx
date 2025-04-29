import React, { useState, useEffect } from 'react';
import { getOptions, calculateDOI } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import MultiSelectDropdown from './MultiSelectDropdown';

const SelectionPage = ({ setResults }) => {
  const [cities, setCities] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Extract numberOfDays from route state
  const numberOfDays = location.state?.numberOfDays || 0;

  useEffect(() => {
    async function fetchOptions() {
      const data = await getOptions();
      console.log('Fetched options:', data);
      setCities(data.cities);
      setProducts(['All Products', ...data.products]);
    }
    fetchOptions();
  }, []);

  const handleSubmit = async () => {
    if (!selectedProduct) {
      alert('Please select a product!');
      return;
    }
    const payload = {
      selected_city: selectedCities,
      selected_product: selectedProduct
    };
    const res = await calculateDOI(payload);
    setResults(res);
    // 👇 Pass numberOfDays along to the /results route
    navigate('/results', { state: { numberOfDays } });
  };

  return (
    <div className="selection-page">
      <div className="selection-box">
        <h2 className="selection-heading">Select Cities and Products</h2>

        <div className="field-section">
          <h4 className="field-heading">Select Cities: </h4>
          <MultiSelectDropdown
            options={cities}
            selectedOptions={selectedCities}
            setSelectedOptions={setSelectedCities}
            placeholder="Select Cities"
          />
        </div>

        <div className="field-section">
          <h4 className="field-heading">Select Product: </h4>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="select-input"
          >
            <option value="">Select Product</option>
            {products.map((product, idx) => (
              <option key={idx} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSubmit}>Get DOI</button>
      </div>
    </div>
  );
};

export default SelectionPage;
