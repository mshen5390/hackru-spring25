import './App.css';
import Filter from './features/filter';
import React, { useState, useEffect } from "react";
import SearchBar from "./features/searchBar";
import "./searchBar.css";
import Modal from "./features/modal";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeButton from './features/homeButton';  // Import your home page component
import './features.css';
import fetchGames from './searchList/list';
import gameCard from './searchList/gameCard';

const App = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [games, setGames] = useState([]); // State to store game data
    const [query, setQuery] = useState(''); // State to hold the search query
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling state


    const handleSearch = (query) => {
        setQuery(query);
        console.log("Searching for:", query);
    };

 
    
    useEffect(() => {
      const fetchGames = async () => {
        try {
          const response = await fetch('http://localhost:2225/api/games'); // Request to serverless function
          const data = await response.json();
          console.log('Full API Response:', data);
          setGames(data);
        } catch (error) {
          console.error('Error fetching game data:', error);
        }
      };
  
      fetchGames();
    }, []);

    useEffect(() => {
      console.log('Modal opened:', isModalOpen);
      console.log('Genres:', genres);
      if (isModalOpen) {
        fetch('/genres.json') // Ensure genres.json is in the public folder
        .then((response) => {
          console.log('Response:', response); // Log the response
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setGenres(data); // Set genres to state when fetched
        })
        .catch((error) => {
          console.error('Error fetching genres:', error);
        });
      }
    }, [isModalOpen]);

    const openModal = () => setIsModalOpen(true);
    //console.log('hi');
    const closeModal = () => setIsModalOpen(false);

    const handleSelectFilters = (value, checked) => {
        if (checked) {
            setSelectedGenres((prevGenres) => [...prevGenres, value]);
        } else {
            setSelectedGenres((prevGenres) => prevGenres.filter((genre) => genre !== value));
        }
    };
    const filteredGames = games.filter((game) => 
        game.name.toLowerCase().startsWith(query.toLowerCase()) // Check if game name matches the query
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
            <button onClick={openModal}>Show Genres</button>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              genres={genres} // Pass fetched genres as props
              onSelectFilters={handleSelectFilters}  // Pass filter handler
            />
            {/* Display Games */}
            <div>
              <h1>Top Games</h1>
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <div key={game.id}>
                    <h2>{game.name}</h2>
                    <p>{game.deck}</p>
                    <img src={game.image?.thumb_url || 'https://via.placeholder.com/400'} alt={game.name} />
                  </div>
                ))
              ) : (
                <p>No Games</p>
              )}
            </div>
          
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
      </Router>
    );
};

export default App;