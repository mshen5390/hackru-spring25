import React, { useState } from 'react';

function Filter() {
  const Filter = ({ selectedGenres, setSelectedGenres }) => {
    return (
      <div>
        <h3>Selected Genres</h3>
        <ul>
          {selectedGenres.map((genre) => (
            <li key={genre.id}>{genre}</li>
          ))}
        </ul>
      </div>
    );
  };
}

export default Filter;