import './App.css';
import Filter from './features/filter';
import React, { useState, useEffect } from "react";
import SearchBar from "./features/searchBar";
import "./searchBar.css";
import Modal from "./features/modal";

const App = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };

    // Fetch genres from the API
    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const response = await fetch('https://api.igdb.com/v4/genres/?fields=*&name=*');
          const data = await response.json();
          const genreNames = data.map((genre) => genre.name); // Extract only the name
          setGenres(genreNames);
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      };
  
      fetchGenres();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSelectFilters = (value, checked) => {
        if (checked) {
            setSelectedGenres((prevGenres) => [...prevGenres, value]);
        } else {
            setSelectedGenres((prevGenres) => prevGenres.filter((genre) => genre !== value));
        }
    };

    return (
        <div>
            <h1>Game Search Engine</h1>
            
            {/* Search bar */}
            <SearchBar onSearch={handleSearch} />
            
            {/* Filter button and Modal */}
            <button onClick={openModal}>Show Genres</button>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                genres={genres}
                onSelectFilters={handleSelectFilters}
            />
            
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