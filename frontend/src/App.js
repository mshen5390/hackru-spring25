import './App.css';
import React, { useState, useEffect } from "react";
import SearchBar from "./features/searchBar";
import "./searchBar.css";
import Modal from "./features/modal";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeButton from './features/homeButton';  // Import your home page component
import './features.css';

const App = () => {
    const [selectedGenres, setSelectedGenres] = useState([]); // Holds the genres selected by the user
    const [genres, setGenres] = useState([]); // Holds the genres fetched from the server
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
    const [games, setGames] = useState([]); // Holds the games data
    const [query, setQuery] = useState(''); // Search query state
    const [displayLimit, setDisplayLimit] = useState(10); // Display limit for games
    const [selectedFilters, setSelectedFilters] = useState([]); // Holds the selected filters for the games

    const handleSearch = (query) => {
        setQuery(query); // Set search query state
    };

    useEffect(() => {
      const fetchGames = async () => {
        try {
          const response = await fetch('http://localhost:2225/api/games'); // Request to serverless function
          const data = await response.json();
          setGames(data); // Store games data in state
        } catch (error) {
          console.error('Error fetching game data:', error);
        }
      };
  
      fetchGames();
    }, []);

    useEffect(() => {
      if (isModalOpen) {
        fetch('/genres.json') // Fetch genres when the modal is open
        .then((response) => response.json())
        .then((data) => {
          setGenres(data); // Set fetched genres to state
        })
        .catch((error) => {
          console.error('Error fetching genres:', error);
        });
      }
    }, [isModalOpen]);

    const openModal = () => setIsModalOpen(true); // Open Modal
    const closeModal = () => setIsModalOpen(false); // Close Modal

    const handleSelectFilters = (value, checked) => {
        if (checked) {
            setSelectedGenres((prevGenres) => [...prevGenres, value]); // Add selected genre
        } else {
            setSelectedGenres((prevGenres) => prevGenres.filter((genre) => genre !== value)); // Remove unselected genre
        }
    };

    // Filter the games based on the query
    const filteredGames = games.filter((game) => 
        game.name.toLowerCase().startsWith(query.toLowerCase())
    );

    return (
      <Router>
        <div>
            <h1 className='Title'>GameSeek</h1>
            
            {/* Routes */}
            <div className='TopBar'>
              <Routes>
                <Route path="/" element={<HomeButton />} />
              </Routes>
            </div>

            {/* Search bar */}
            <SearchBar onSearch={handleSearch} />
            
            {/* Filter button and Modal */}
            <button onClick={openModal} className='Filter'>Filter</button>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              genres={genres} // Pass fetched genres as props
              onSelectFilters={handleSelectFilters}  // Pass filter handler
            />

            {/* Display selected filters container outside the modal */}
            <div className="SelectedFilterContainer">
                <h3>Selected Filters:</h3>
                <ul>
                  {selectedGenres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>
            </div>

            {/* Display Games */}
            <div className='GameContainer'>
              <h1>{query ? "Results" : "Top Games"}</h1>
              {filteredGames.length > 0 ? (
                filteredGames.slice(0, displayLimit).map((game) => (
                  <div key={game.id} className='GameCard'>
                    <h2>{game.name}</h2>
                      <div className='Description'>
                        <img className='Img' src={game.image?.thumb_url || 'https://via.placeholder.com/400'} alt={game.name} />
                        <p>{game.deck}</p>
                      </div>
                  </div>
                ))
              ) : (
                <p>No Games</p>
              )}
              {/* Button to load more games */}
              <button onClick={() => setDisplayLimit(displayLimit + 10)}>Show More</button>
            </div>
        </div>
      </Router>
    );
};

export default App;
