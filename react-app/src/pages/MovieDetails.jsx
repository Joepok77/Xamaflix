// Page MovieDetails pour Xamaflix
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/tmdbApi';

function MovieDetails() {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const navigate = useNavigate(); // Pour la navigation programmatique
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setLoading(true);
        const details = await getMovieDetails(id);
        setMovie(details);
        setError(null);
      } catch {
        setError('Impossible de charger les détails du film');
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]); // Recharger si l'ID change

  if (loading) {
    return (
      <div className="text-center mt-5" style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mt-5" style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
        <div className="alert alert-danger">{error || 'Film introuvable'}</div>
        <Link to="/" className="btn btn-danger">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
      {/* Bannière avec image de fond */}
      {movie.backdrop && (
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url(${movie.backdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '100px 0',
            marginBottom: '30px'
          }}
        >
          <div className="container">
            <button
              className="btn btn-outline-light mb-3"
              onClick={() => navigate(-1)}
            >
              ← Retour
            </button>
            <h1 className="text-white display-4">{movie.title}</h1>
            <p className="text-white fs-5">{movie.year}</p>

            {/* Boutons d'action */}
            <div className="d-flex gap-3 mt-4">
              <button
                className="btn btn-danger btn-lg px-4"
                onClick={() => alert('🎬 Lecture du film ' + movie.title + '\n\n(Fonctionnalité de streaming à venir)')}
              >
                <svg width="20" height="20" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M6.271 5.055a.5.5 0 0 1 .52.04L11 6.7a.5.5 0 0 1 0 .6L6.791 9.915a.5.5 0 0 1-.791-.408V5.493a.5.5 0 0 1 .271-.438z"/>
                </svg>
                Regarder
              </button>

              <button
                className="btn btn-outline-light btn-lg px-4"
                onClick={() => {
                  const myList = JSON.parse(localStorage.getItem('myList') || '[]');
                  const isInList = myList.some(item => item.id === movie.id);
                  if (isInList) {
                    alert('Ce film est déjà dans votre liste !');
                  } else {
                    const movieData = {
                      id: movie.id,
                      title: movie.title,
                      poster_path: movie.poster.replace('https://image.tmdb.org/t/p/w500', ''),
                      overview: movie.overview,
                      vote_average: movie.rating,
                      release_date: movie.year
                    };
                    myList.push(movieData);
                    localStorage.setItem('myList', JSON.stringify(myList));
                    alert('✅ Film ajouté à Ma Liste !');
                  }
                }}
              >
                <svg width="16" height="16" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Ma Liste
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="row">
          {/* Colonne gauche : Poster */}
          <div className="col-md-4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="img-fluid rounded shadow-lg"
            />

            <div className="card mt-3 bg-dark text-white">
              <div className="card-body">
                <h5 className="card-title">Informations</h5>
                <p className="mb-1"><strong>Note :</strong> ⭐ {movie.rating}/10</p>
                <p className="mb-1"><strong>Durée :</strong> {movie.runtime} min</p>
                <p className="mb-1">
                  <strong>Genres :</strong>
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="badge bg-danger ms-1">
                      {genre}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Colonne droite : Détails */}
          <div className="col-md-8">
            <h2 className="mb-3 text-white">Synopsis</h2>
            <p className="lead text-white-50">{movie.overview}</p>

            <hr className="my-4 bg-secondary" />

            <h3 className="mb-3 text-white">Distribution</h3>
            <div className="row">
              {movie.cast.map(actor => (
                <div key={actor.id} className="col-md-3 col-6 mb-3">
                  <div className="card bg-dark text-white">
                    <img
                      src={actor.photo}
                      className="card-img-top"
                      alt={actor.name}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-body p-2">
                      <p className="card-text small mb-0">
                        <strong>{actor.name}</strong>
                      </p>
                      <p className="card-text small text-muted">{actor.character}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
