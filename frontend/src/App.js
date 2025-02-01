import './App.css';
import Filter from './features/filter';
import { useState } from 'react';

function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div>
      <h1>Game Search</h1>
      
      {/* Use Filter component */}
      <Filter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      
      {/* Display selected genres */}
      <div>
        <h2>Selected Genres:</h2>
        <ul>
          {selectedGenres.map((genre) => (
            <li key={genre}>{genre}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
