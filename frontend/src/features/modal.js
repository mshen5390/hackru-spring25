import React from 'react';

function Modal({ isOpen, onClose, genres, onSelectFilters }) {
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
          {genres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                value={genre}
                onChange={handleChange}
              />
              {genre}
            </label>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
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