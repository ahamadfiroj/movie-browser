import React, { useState, useCallback } from 'react';
import { SearchBarContainer, SearchInput } from '../styles/StyledComponents';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback((term) => {
    let timeout;
    const debounce = (func, wait) => {
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
    
    const search = debounce(onSearch, 300);
    search(term);
  }, [onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search movies"
      />
    </SearchBarContainer>
  );
}

export default SearchBar;
