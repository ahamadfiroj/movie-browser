import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Headers';
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import { searchMovies } from './utils/api';
import { getFavorites } from './utils/storage';
import { AppContainer, MainContent } from './styles/StyledComponents';
import MovieDetail from './components/MovieDetail';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCurrentFetchEmpty, setIsCurrentFetchEmpty] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const fetchMovies = async ({ newPage = page, newSearchTerm = searchTerm, newFilters = filters } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchMovies(newSearchTerm, newFilters, newPage);
      if (Array.isArray(results) && !results.length) {
        setIsCurrentFetchEmpty(true);
      }
      setMovies(prevMovies => newPage === 1 ? results : [...prevMovies, ...results]);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchMovies();
    }
  }, [page]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setMovies([]);
    setPage(1);
    setIsCurrentFetchEmpty(false);
    fetchMovies({ newPage: 1, newSearchTerm: term });
  };

  const handleFilterChange = (newFilters, isResetFilter = false) => {
    if (isResetFilter) {
      setFilters(newFilters);
      return;
    }
    setFilters(newFilters);
    setMovies([]);
    setPage(1);
    fetchMovies({ newPage: 1, newFilters });
  };

  const loadMore = () => {
    if (!isCurrentFetchEmpty) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <SearchBar onSearch={handleSearch} />
                  <Filters 
                    onFilterChange={handleFilterChange} 
                    disabled={searchTerm.trim() !== ''} 
                    setIsCurrentFetchEmpty={setIsCurrentFetchEmpty}  
                  />
                  {error && <p>{error}</p>}
                  <MovieList 
                    movies={movies} 
                    favorites={favorites} 
                    setFavorites={setFavorites} 
                    loading={loading}
                    loadMore={loadMore}
                    isCurrentFetchEmpty={isCurrentFetchEmpty}
                    setIsCurrentFetchEmpty={setIsCurrentFetchEmpty}
                  />
                  {loading && <p>Loading...</p>}
                </>
              } 
            />
            <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie detail route */}
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
