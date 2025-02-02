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

    // // Fetch genres from the API
    // useEffect(() => {
    //   const fetchGenres = async () => {
    //     try {
    //       const response = await fetch('https://api.igdb.com/v4/genres/?fields=*&name=*');
    //       const data = await response.json();
    //       const genreNames = data.map((genre) => genre.name); // Extract only the name
    //       setGenres(genreNames);
    //     } catch (error) {
    //       console.error('Error fetching genres:', error);
    //     }
    //   };
  
    //   fetchGenres();
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
            
    //         const data = await fetchGames(); // Call the fetchGames function
    //         console.log(data);
    //         setGames(data); // Set the fetched game data to state
    //         setLoading(false); // Stop loading
    //       } catch (error) {
    //         setError('Failed to fetch game data'); // Set error message if fetching fails
    //         setLoading(false); // Stop loading
    //       }
    //     };
  
    //     fetchData();
    //   }, []); // Only run once when the component mounts
  

    
      
    
      useEffect(() => {
        const fetchGames = async () => {
          try {
            const response = await fetch('http://localhost:2225/api/games'); // Request to serverless function
            const data = await response.json();
            console.log('Full API Response:', response.data);
            setGames(data);
          } catch (error) {
            console.error('Error fetching game data:', error);
          }
        };
    
        fetchGames();
      }, []);

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
        game.name.toLowerCase().includes(query.toLowerCase()) // Check if game name matches the query
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
                genres={genres}
                onSelectFilters={handleSelectFilters}
            />

            {/* Display Games */}
            <div>
              <h1>Top Games</h1>
              {games.length > 0 ? (
                games.map((game, index) => (
                  <div key={index}>
                    <h2>{game.name}</h2>
                    <p>{game.deck}</p>
                    <img src={game.image?.medium_url || 'https://via.placeholder.com/400'} alt={game.name} />
                  </div>
                ))
              ) : (
                <p>Loading games...</p>
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