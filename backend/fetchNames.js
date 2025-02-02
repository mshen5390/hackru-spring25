// fetchGenres;
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const api_key='c7bc6dcc139e582f5447279225852af527a649ae';

//const API_KEY = 'your_api_key';  // Replace with your Giant Bomb API key
const url = 'https://www.giantbomb.com/api/games/';
//I can make a random num generator so that it won't be the same games
//everytime making it a bit more active
const getNames = async (names) => {
  try {
    const response = await axios.get(`${url}`, {
      params: {
        api_key: api_key,
        format: 'json',
        field_list: 'name,description',
        //filter: `name:${names}*`, // Filters names starting with 'letter'
        //add image stuff later
        sort: 'original_game_rating:desc', // Sort by most recent release
        //limit: 50,
        //random num gen here for the offset prob a number between 50-100
        //offset: 100
        
        //query: 'name',
      },
    });
    //console.log(response.data);  // You can process the data as needed
    const sortedNames = response.data.results.sort((a, b) => 
      a.name.localeCompare(b.name) // Sorts in ascending order (A-Z)
    );
    fs.writeFileSync('names.json', JSON.stringify(response.data.results, null, 2));

    //console.log('Genres saved to names.json');
  } catch (error) {
    console.error('Error fetching data from Giant Bomb API:', error);
  }
};

getNames();

//<div>
// <h1>Top Games</h1>
// {games.map(game => (
//   <div key={game.id}>
//     <h2>{game.name}</h2>
//     <p>{game.deck}</p>
//     <img src={game.image.medium_url} alt={game.name} />
//   </div>
// ))}
// </div>
// );
// };