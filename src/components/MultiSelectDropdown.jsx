import React, { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({ options, selectedOptions, setSelectedOptions, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options);
    }
  };

  const getHeaderText = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    } else if (selectedOptions.length === options.length) {
      return 'Select All';
    } else if (selectedOptions.length === 1) {
      return selectedOptions[0];
    } else {
      return 'Selected Cities';
    }
  };

  // ✨ NEW: Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="multi-select" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {getHeaderText()}
      </div>
      {isOpen && (
        <div className="dropdown-body">
          <label>
            <input
              type="checkbox"
              checked={selectedOptions.length === options.length}
              onChange={toggleSelectAll}
            />
            Select All
          </label>
          {options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
