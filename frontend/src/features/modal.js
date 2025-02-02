import React, { useState } from "react";

function Modal({ isOpen, onClose, genres, onSelectFilters }) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  if (!isOpen) return null;

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the filter to the selected filters
      setSelectedFilters((prevFilters) => [...prevFilters, value]);
    } else {
      // Remove the filter from the selected filters
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }

    // Update selected filters in the parent component
    onSelectFilters(value, checked);
  };

  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyles = {
    display: 'flex',
    flexDirection: 'column', // Stack close button on top, filters below
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '80%', // Adjust width for a better layout
    maxWidth: '700px', // Prevents it from being too wide
    textAlign: 'center',
};

const filtersContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // 5 columns
    gap: '10px',
    marginTop: '10px', // Spacing between close button and filters
    marginBottom: '20px',
};


  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2>Select Filters</h2>
        <div style={filtersContainerStyles}>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <div key={genre.id}>
                <label>
                  <input
                    type="checkbox"
                    value={genre.name}
                    onChange={handleCheckboxChange} // Update selected genres on change
                  />
                  {genre.name} {/* Display genre name next to checkbox */}
                </label>
              </div>
            ))
          ) : (
            <p>No Filters</p> // If no genres, display a message
          )}
        </div>
        <button onClick={onClose}>Close</button> {/* Close the modal */}
      </div>
    </div>
  );
}

export default Modal;
