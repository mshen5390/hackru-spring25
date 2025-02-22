// fetchGenres;
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const api_key='c7bc6dcc139e582f5447279225852af527a649ae';

//const API_KEY = 'your_api_key';  // Replace with your Giant Bomb API key
const url = 'https://www.giantbomb.com/api/genres/';

const getGenres = async (genres) => {
  try {
    const response = await axios.get(`${url}`, {
      params: {
        api_key: api_key,
        format: 'json',
        field_list: 'name,id',
        
        //query: 'name',
      },
    });
    //console.log(response.data);  // You can process the data as needed
    const sortedGenres = response.data.results.sort((a, b) => 
      a.name.localeCompare(b.name) // Sorts in ascending order (A-Z)
    );
    console.log('hi');
    fs.writeFileSync('genres.json', JSON.stringify(response.data.results, null, 2));

    //console.log('Genres saved to genres.json');
  } catch (error) {
    console.error('Error fetching data from Giant Bomb API:', error);
  }
};
getGenres();
// Example call to fetch game data
// getGameData('The Witcher 3');

