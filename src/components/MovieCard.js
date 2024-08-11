import React, { forwardRef } from 'react';
import FavoriteButton from './FavoriteButton';
import { useNavigate } from 'react-router-dom';

import { MovieCardContainer, MoviePoster, MovieTitle, MovieInfo } from '../styles/StyledComponents';

const MovieCard = forwardRef(({ movie, isFavorite, setFavorites }, ref) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <MovieCardContainer ref={ref} onClick={handleClick}>
      <MoviePoster src={movie.poster} alt={`${movie.title} poster`} />
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieInfo>Release Year: {movie.year}</MovieInfo>
      <FavoriteButton 
        movieId={movie.id} 
        isFavorite={isFavorite} 
        setFavorites={setFavorites} 
      />
    </MovieCardContainer>
  );
});

export default MovieCard;