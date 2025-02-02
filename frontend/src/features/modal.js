
import React, { useState, useEffect } from "react";

function Modal({ isOpen, onClose, genre, onSelectFilters }) {
  const [genres, setGenres] = useState([]);

  

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { value, checked } = event.target;
    onSelectFilters(value, checked);
  };

  return (
    
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2>Select Filters</h2>
        <div>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <div key={genre.id}>
                <label>
                  <input
                    type="checkbox"
                    value={genre.name}
                    onChange={handleChange} // Update selected genres on change
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
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  width: '300px',
  textAlign: 'center',
};

export default Modal;