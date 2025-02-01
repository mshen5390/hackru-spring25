import React, { useState } from 'react';

function Filter() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
  
    if (checked) {
      // Add the filter to the selected filters
      setSelectedFilters((prevFilters) => [...prevFilters, value]);
    } else {
      // Remove the filter from the selected filters
      setSelectedFilters((prevFilters) => prevFilters.filter((filter) => filter !== value));
    }
  };

  return (
    <div>
      <h3>Filter Games by Genre</h3>
      
      {/* Create checkboxes for different filters */}
      <label>
        <input
          type="checkbox"
          value="Action"
          onChange={handleCheckboxChange}
        />
        Action
      </label>
      <label>
        <input
          type="checkbox"
          value="Adventure"
          onChange={handleCheckboxChange}
        />
        Adventure
      </label>
      <label>
        <input
          type="checkbox"
          value="RPG"
          onChange={handleCheckboxChange}
        />
        RPG
      </label>

      {/* Display selected filters */}
      <div>
        <p>Selected Filters:</p>
        <ul>
          {selectedFilters.map((filter, index) => (
            <li key={index}>{filter}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Filter;