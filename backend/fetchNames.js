const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const api_key = process.env.REACT_APP_API_KEY; // Replace with your Giant Bomb API key

const app = express();
const port = process.env.PORT || 2225;

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // For parsing application/json

const url = 'https://www.giantbomb.com/api/games/';

// Route to fetch games and send data to front-end
app.get('/api/games', async (req, res) => {
  try {
    const response = await axios.get(`${url}`, {
      params: {
        api_key: api_key,
        format: 'json',
        field_list: 'name,deck,image,id,genres',
        sort: 'original_game_rating:desc', // Sort by most recent release
      },
    });

    // Sort games alphabetically
    const sortedNames = response.data.results.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    
    //fs.writeFileSync('names.json', JSON.stringify(response.data.results, null, 2));
    res.json(sortedNames); // Send the game data as a JSON response
  } catch (error) {
    console.error('Error fetching data from Giant Bomb API:', error);
    res.status(500).json({ error: 'Failed to fetch game data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


