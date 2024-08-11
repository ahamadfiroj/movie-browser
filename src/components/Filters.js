import React, { useEffect, useState } from 'react';
import { FiltersContainer, FilterSelect, FilterInput, FilterButton } from '../styles/StyledComponents';
import { fetchGenres } from '../utils/api';

function Filters({ onFilterChange, disabled, setIsCurrentFetchEmpty }) {
  const [filters, setFilters] = useState({
    genre: '',
    yearFrom: '',
    yearTo: '',
    ratingFrom: '',
    ratingTo: '',
  });

  const [fetchGenreOptions, setGenres] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (disabled) {
      setFilters({
        genre: '',
        yearFrom: '',
        yearTo: '',
        ratingFrom: '',
        ratingTo: '',
      })
      onFilterChange({
        genre: '',
        yearFrom: '',
        yearTo: '',
        ratingFrom: '',
        ratingTo: '',
      });
    }
  }, [disabled])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
    setIsCurrentFetchEmpty(false)
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <FiltersContainer>
      <FilterSelect name="genre" value={filters.genre} onChange={handleChange} disabled={disabled}>
        <option value="">All Genres</option>
        {fetchGenreOptions.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </FilterSelect>
      <FilterInput
        type="number"
        name="yearFrom"
        placeholder="Year from"
        value={filters.yearFrom}
        onChange={handleChange}
        disabled={disabled}
      />
      <FilterInput
        type="number"
        name="yearTo"
        placeholder="Year to"
        value={filters.yearTo}
        onChange={handleChange}
        disabled={disabled}
      />
      <FilterInput
        type="number"
        name="ratingFrom"
        placeholder="Rating from"
        min="0"
        max="10"
        step="0.5"
        value={filters.ratingFrom}
        onChange={handleChange}
        disabled={disabled}
      />
      <FilterInput
        type="number"
        name="ratingTo"
        placeholder="Rating to"
        min="0"
        max="10"
        step="0.5"
        value={filters.ratingTo}
        onChange={handleChange}
        disabled={disabled}
      />
      <FilterButton onClick={applyFilters} disabled={disabled}>Apply Filters</FilterButton>
    </FiltersContainer>
  );
}

export default Filters;