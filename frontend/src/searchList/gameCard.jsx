import React from 'react';

const gameCard = ({ game }) => {
    // Destructure properties from the game object
    const { name: Title, description: Description, image: { medium_url: Poster }, type: Type } = game;

    return (
        <div className="game-card">
            <div>
                <h2>{Title}</h2>
                <p>{Description}</p>
                <img src={Poster || 'https://via.placeholder.com/400'} alt={Title} />
                <span>{Type}</span>
            </div>
        </div>
    );
};

export default gameCard;