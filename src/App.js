import React, { useState, useEffect, useCallback } from 'react';
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
  const [filters, setFilters] = useState({
    genre: '',
    yearFrom: '',
    yearTo: '',
    ratingFrom: '',
    ratingTo: '',
  });
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCurrentFetchEmpty, setIsCurrentFetchEmpty] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const fetchMovies = useCallback(async ({ newPage = page, newSearchTerm = searchTerm, newFilters = filters } = {}) => {
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
  }, [page, searchTerm, filters]);

  useEffect(() => {
    const fetchMoviesFunc = async() => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchMovies(null, {}, 1);
        if (Array.isArray(results) && !results.length) {
          setIsCurrentFetchEmpty(true);
        }
        setMovies(prevMovies => [...prevMovies, ...results]);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMoviesFunc();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setMovies([]);
    setPage(1);
    setIsCurrentFetchEmpty(false);
    if (searchTerm !== term) {
      fetchMovies({ newPage: 1, newSearchTerm: term })
      term && setFilters({
        genre: '',
        yearFrom: '',
        yearTo: '',
        ratingFrom: '',
        ratingTo: '',
      });
    };
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    setMovies([]);
    setPage(1);
    fetchMovies({ newPage: 1, filters });
  }

  const loadMore = () => {
    if (!isCurrentFetchEmpty) {
      setPage(prevPage => {
        const page = prevPage + 1
        if (page > 1) {
          fetchMovies({ newPage: page });
        }
        return page;
      });
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
                    filters={filters}
                    applyFilters={applyFilters}
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
