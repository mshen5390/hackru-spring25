import './App.css';
import Filter from './features/filter';
//Searchbar
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import "./SearchBar.css";

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log("Searching for:", query);
    };

    return (
        <div>
            <h1>Game Search Engine</h1>
            <SearchBar onSearch={handleSearch} />
            <p>Search term: {searchQuery}</p>
        </div>
    );
};


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
