const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query, filters, page = 1) {
  try {
    const url = new URL(`${BASE_URL}/search/movie`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('query', query);
    url.searchParams.append('page', page);

    if (filters.genre) url.searchParams.append('with_genres', filters.genre);
    if (filters.yearFrom) url.searchParams.append('primary_release_date.gte', `${filters.yearFrom}-01-01`);
    if (filters.yearTo) url.searchParams.append('primary_release_date.lte', `${filters.yearTo}-12-31`);
    if (filters.ratingFrom) url.searchParams.append('vote_average.gte', filters.ratingFrom);
    if (filters.ratingTo) url.searchParams.append('vote_average.lte', filters.ratingTo);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.error('Unexpected API response structure:', data);
      return [];
    }

    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster',
      rating: movie.vote_average || 'N/A'
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};