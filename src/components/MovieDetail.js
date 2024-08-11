
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../utils/api';
import { DetailContainer,  DownloadButton } from '../styles/StyledComponents';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to load movie details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <DetailContainer>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      {movie.videoUrl ? (
        <>
          <iframe
            width="100%"
            height="500"
            src={movie.videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={movie.title}
          ></iframe>
          <DownloadButton
            href={`https://2conv.com/en45/?url=https://www.youtube.com/watch?v=${movie.trailerKey}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Trailer
          </DownloadButton>
        </>
      ) : (
        <p>No trailer available</p>
      )}
    </DetailContainer>
  );
}

export default MovieDetail;
