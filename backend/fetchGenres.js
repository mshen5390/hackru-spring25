const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const IGDB_URL = 'https://api.igdb.com/v4/genres';
const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;

const fetchGenres = async () => {
  try {
    const response = await axios.post(
      IGDB_URL,
      'fields id, name;',
      {
        headers: {
          'Client-ID': CLIENT_ID,
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    const genres = response.data;

    fs.writeFileSync('genres.json', JSON.stringify(genres, null, 2));

    console.log('Genres saved to genres.json');
  } catch (error) {
    console.error('Error fetching genres:', error.message);
  }
};

fetchGenres();
