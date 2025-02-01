import logo from './logo.svg';
import './App.css';
import Filter from '.Filter';

function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  return (
    <div>
      <h1>Game Search</h1>
      
      {/* Use Filter component */}
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
  );
}

export default App;
