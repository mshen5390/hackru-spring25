import React from "react";

function Modal({ isOpen, onClose, genres, onSelectFilters, selectedGenres }) {
  if (!isOpen) return null;

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    onSelectFilters(value, checked); // Update selected filters in the parent
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
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '700px',
    textAlign: 'center',
  };

  const filtersContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
    marginTop: '10px',
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
                    onChange={handleCheckboxChange}
                    checked={selectedGenres.includes(genre.name)} // Keep checkbox state synced
                  />
                  {genre.name}
                </label>
              </div>
            ))
          ) : (
            <p>No Filters</p>
          )}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
