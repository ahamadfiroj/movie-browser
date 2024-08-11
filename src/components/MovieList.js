import React, { useRef, useCallback } from 'react';
import MovieCard from './MovieCard';
import { MovieListContainer } from '../styles/StyledComponents';

function MovieList({ movies, favorites, setFavorites, loading, loadMore }) {
    const observer = useRef();
    const lastMovieElementRef = useCallback(node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    }, [loading, loadMore]);

  return (
    <MovieListContainer>
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          setFavorites={setFavorites}
          ref={index === movies.length - 1 ? lastMovieElementRef : null}
        />
      ))}
    </MovieListContainer>
  );
}


export default MovieList;
