import './App.css';
import React, { useState, useEffect } from "react";
import SearchBar from "./features/searchBar";
import "./searchBar.css";
import Modal from "./features/modal";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeButton from './features/homeButton';
import './features.css';

const App = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [games, setGames] = useState([]);
    const [query, setQuery] = useState('');
    const [displayLimit, setDisplayLimit] = useState(10);

    const handleSearch = (query) => {
        setQuery(query);
    };

    useEffect(() => {
      const fetchGames = async () => {
        try {
          const response = await fetch('http://localhost:2225/api/games');
          const data = await response.json();
          setGames(data);
        } catch (error) {
          console.error('Error fetching game data:', error);
        }
      };

      fetchGames();
    }, []);

    useEffect(() => {
      if (isModalOpen) {
        fetch('/genres.json')
        .then((response) => response.json())
        .then((data) => {
          setGenres(data);
        })
        .catch((error) => {
          console.error('Error fetching genres:', error);
        });
      }
    }, [isModalOpen]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSelectFilters = (value, checked) => {
        if (checked) {
            setSelectedGenres((prevGenres) => [...prevGenres, value]);
        } else {
            setSelectedGenres((prevGenres) => prevGenres.filter((genre) => genre !== value));
        }
    };

    const filteredGames = games.filter((game) => 
        game.name.toLowerCase().startsWith(query.toLowerCase())
    );

    return (
      <Router>
        <div>
            <h1 className='Title'>GameSeek</h1>
            <div className='TopBar'>
              <Routes>
                <Route path="/" element={<HomeButton />} />
              </Routes>
            </div>

            <SearchBar onSearch={handleSearch} />

            <button onClick={openModal} className='Filter'>Filter</button>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              genres={genres}
              onSelectFilters={handleSelectFilters}
              selectedGenres={selectedGenres} // Pass selected genres
            />

            <div className="SelectedFilterContainer">
                <h3>Selected Filters:</h3>
                <ul>
                  {selectedGenres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>
            </div>

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
              <button onClick={() => setDisplayLimit(displayLimit + 10)}>Show More</button>
            </div>
        </div>
      </Router>
    );
};

export default App;
