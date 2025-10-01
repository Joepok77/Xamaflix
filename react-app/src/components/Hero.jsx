import { Link } from 'react-router-dom';

function Hero({ movie }) {
  if (!movie) return null;

  const handleAddToList = () => {
    // Récupérer la liste depuis localStorage
    const myList = JSON.parse(localStorage.getItem('myList') || '[]');

    // Vérifier si le film est déjà dans la liste
    const isAlreadyInList = myList.some(item => item.id === movie.id);

    if (isAlreadyInList) {
      alert('Ce film est déjà dans votre liste !');
    } else {
      // Ajouter le film avec le bon format (poster_path au lieu de poster)
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
  };

  const handleWatch = () => {
    alert('🎬 Lecture du film ' + movie.title + '\n\n(Fonctionnalité de streaming à venir)');
  };

  return (
    <section
      className="hero position-relative overflow-hidden"
      style={{ minHeight: '70vh' }}
    >
      {/* Image de fond */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: 'cover',
          zIndex: 1,
          filter: 'brightness(0.4)'
        }}
      />

      {/* Gradient overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)',
          zIndex: 2
        }}
      ></div>

      {/* Contenu */}
      <div
        className="container position-relative h-100 d-flex align-items-center"
        style={{ zIndex: 3, minHeight: '70vh' }}
      >
        <div className="row">
          <div className="col-lg-6">
            <div className="hero-content">
              <span className="badge bg-danger mb-2">🔥 Film en vedette</span>
              <h1 className="display-3 fw-bold text-white mb-3">{movie.title}</h1>
              <p className="lead text-white-50 mb-4">
                {movie.overview}
              </p>

              {/* Métadonnées */}
              <div className="movie-meta mb-4">
                <div className="d-flex flex-wrap gap-3 text-white-50 mb-2">
                  <span>📅 {movie.year}</span>
                  <span>⭐ {movie.rating}/10</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="hero-buttons d-flex gap-3 flex-wrap">
                <button
                  type="button"
                  className="btn btn-danger btn-lg px-4"
                  onClick={handleWatch}
                >
                  <svg width="20" height="20" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.04L11 6.7a.5.5 0 0 1 0 .6L6.791 9.915a.5.5 0 0 1-.791-.408V5.493a.5.5 0 0 1 .271-.438z"/>
                  </svg>
                  Lecture
                </button>

                <Link
                  to={`/movie/${movie.id}`}
                  className="btn btn-outline-light btn-lg px-4"
                >
                  ℹ️ Plus d'infos
                </Link>

                <button
                  type="button"
                  className="btn btn-outline-light btn-lg px-4"
                  onClick={handleAddToList}
                >
                  <svg width="16" height="16" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>
                  Ma Liste
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
