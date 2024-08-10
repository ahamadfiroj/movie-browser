import React, { forwardRef } from 'react';
import FavoriteButton from './FavoriteButton';
import { MovieCardContainer, MoviePoster, MovieTitle, MovieInfo } from '../styles/StyledComponents';

const MovieCard = forwardRef(({ movie, isFavorite, setFavorites }, ref) => {
  return (
    <MovieCardContainer ref={ref}>
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