const GameSeeker = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchGames = async () => {
      try {
        console.log('hi');
        //const response = await axios.get('http://localhost:2225/api/games');
        const response = await fetch('https://www.giantbomb.com/api/games/?api_key=c7bc6dcc139e582f5447279225852af527a649ae&format=json&field_list=name,description,image,id&sort=original_game_rating:desc');
        const data = await response.json();
        console.log('Fetched games:', data);
        setGames(data.results); // Set the fetched game data to state
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGames();
  }, []);
};