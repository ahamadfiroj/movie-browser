import React, { useState, useEffect } from 'react';
import Header from './components/Headers';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import { searchMovies } from './utils/api';
import { getFavorites } from './utils/storage';
import { AppContainer, MainContent } from './styles/StyledComponents';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const fetchMovies = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchMovies(searchTerm || null, filters, page);
      setMovies(prevMovies => [...prevMovies, ...results]);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchMovies(page);
  }, [searchTerm, page]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setMovies([]);
    setPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setMovies([]);
    setTimeout(()=>{
      fetchMovies(1);
    }, 0)
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <SearchBar onSearch={handleSearch} />
        <Filters onFilterChange={handleFilterChange} />
        {error && <p>{error}</p>}
        <MovieList 
          movies={movies} 
          favorites={favorites} 
          setFavorites={setFavorites} 
          loading={loading}
          loadMore={loadMore}
        />
        {loading && <p>Loading...</p>}
      </MainContent>
    </AppContainer>
  );
}

export default App;