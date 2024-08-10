export function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
  
  export function toggleFavorite(movieId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(movieId);
    
    if (index === -1) {
      favorites.push(movieId);
    } else {
      favorites.splice(index, 1);
    }
  
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites;
  }