import styled from 'styled-components';

// App
export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Header
export const HeaderContainer = styled.header`
  background-color: #1a1a1a;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// MovieList
export const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
`;

// MovieCard
export const MovieCardContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const MovieTitle = styled.h2`
  font-size: 1.2rem;
  margin: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const MovieInfo = styled.p`
  font-size: 0.9rem;
  margin: 10px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// SearchBar
export const SearchBarContainer = styled.div`
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px;
  }
`;

// Filters
export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterInput = styled.input`
  padding: 8px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterSelect = styled.select`
  padding: 8px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// FavoriteButton
export const FavoriteButtonStyled = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    color: #ff0000;
  }
`;