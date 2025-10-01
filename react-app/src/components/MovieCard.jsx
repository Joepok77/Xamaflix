import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ id, title, year, rating, poster }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    setIsWatched(watchedMovies.includes(id));
  }, [id]);

  const handleLike = (e) => {
    e.preventDefault(); // Empêcher la navigation lors du clic
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleToggleWatched = (e) => {
    e.preventDefault();
    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies') || '[]');

    if (isWatched) {
      // Retirer le film de la liste des films vus
      const updatedWatched = watchedMovies.filter(movieId => movieId !== id);
      localStorage.setItem('watchedMovies', JSON.stringify(updatedWatched));
      setIsWatched(false);
    } else {
      // Ajouter le film à la liste des films vus (sans l'ajouter à Ma Liste)
      watchedMovies.push(id);
      localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
      setIsWatched(true);
    }
  };

  return (
    <div className="col-md-3 mb-4">
      <Link to={`/movie/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card bg-dark text-white h-100 hover-card position-relative">
          {/* Badge Film Vu */}
          {isWatched && (
            <div
              className="position-absolute top-0 end-0 m-2"
              style={{ zIndex: 10 }}
            >
              <span className="badge bg-success">✓ Vu</span>
            </div>
          )}
          <img
            src={poster}
            className="card-img-top"
            alt={title}
            style={{ height: '400px', objectFit: 'cover', opacity: isWatched ? 0.7 : 1 }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <span className="badge bg-primary">{year}</span>
              <span className="badge bg-warning ms-2">⭐ {rating}/10</span>
            </p>
            <div className="d-flex gap-2">
              <button
                className={`btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={handleLike}
              >
                {isLiked ? '❤️' : '🤍'} {likes}
              </button>
              <button
                className={`btn btn-sm ${isWatched ? 'btn-success' : 'btn-outline-success'}`}
                onClick={handleToggleWatched}
              >
                {isWatched ? '✓ Vu' : '👁️ Marquer vu'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
