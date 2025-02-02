import React from 'react';

const HomeButton = () => {
    const handleHomeClick = () => {
        window.location.reload();  // Reload the page when clicked
    };

    return (
        <button onClick={handleHomeClick} className='Home'>
            Home
        </button>
    );
};

export default HomeButton;
