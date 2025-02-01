import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value); // Pass the search term to parent component
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search for a game..."
                value={query}
                onChange={handleInputChange}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;