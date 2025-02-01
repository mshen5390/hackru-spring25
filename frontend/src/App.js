import './App.css';
import Filter from './features/filter';
import React, { useState } from "react";
import SearchBar from "./features/searchBar";
import ".searchBar.css";

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        console.log("Searching for:", query);
    };

    return (
        <div>
            <h1>Game Search Engine</h1>
            
            {/* Search bar */}
            <SearchBar onSearch={handleSearch} />
            <p>Search term: {searchQuery}</p>
            
            {/* Filter component */}
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
};

export default App;