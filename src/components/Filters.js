import React, { useEffect, useState } from 'react';
import { FiltersContainer, FilterSelect, FilterInput, FilterButton } from '../styles/StyledComponents';
import {fetchGenres} from '../utils/api';

function Filters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        genre: '',
        yearFrom: '',
        yearTo: '',
        ratingFrom: '',
        ratingTo: '',
      });

      const [fetchGenreOptions, setGenres] = useState([])

      useEffect(() => {
        const fetchInitialData = async () => {
          const genresData = await fetchGenres();
          setGenres(genresData);
        };
        fetchInitialData();
      }, []);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
          ...prevFilters,
          [name]: value
        }));
      };
    
      const applyFilters = () => {
        onFilterChange(filters);
      };

  return (
    <FiltersContainer>
      <FilterSelect name="genre" value={filters.genre} onChange={handleChange}>
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
      />
      <FilterInput
        type="number"
        name="yearTo"
        placeholder="Year to"
        value={filters.yearTo}
        onChange={handleChange}
      />
      <FilterInput
        type="number"
        name="ratingFrom"
        placeholder="Rating from"
        min="0"
        max="10"
        step="0.1"
        value={filters.ratingFrom}
        onChange={handleChange}
      />
      <FilterInput
        type="number"
        name="ratingTo"
        placeholder="Rating to"
        min="0"
        max="10"
        step="0.1"
        value={filters.ratingTo}
        onChange={handleChange}
      />
      <FilterButton onClick={applyFilters}>Apply Filters</FilterButton>
    </FiltersContainer>
  );
}

export default Filters;