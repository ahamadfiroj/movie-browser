import React from 'react';
import { toggleFavorite } from '../utils/storage';
import { FavoriteButtonStyled } from '../styles/StyledComponents';

function FavoriteButton({ movieId, isFavorite, setFavorites }) {
  const handleClick = (e) => {
    const newFavorites = toggleFavorite(movieId);
    setFavorites(newFavorites);
    e.stopPropagation()
  };

  return (
    <FavoriteButtonStyled 
      className={isFavorite ? 'active' : ''}
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </FavoriteButtonStyled>
  );
}

export default FavoriteButton;