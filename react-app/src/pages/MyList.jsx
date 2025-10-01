import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyList() {
  const navigate = useNavigate();
  const [myList, setMyList] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    // Charger la liste de films
    const list = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(list);

    // Charger les films vus
    const watched = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    setWatchedMovies(watched);
  }, []);

  const removeFromList = (movieId) => {
    const updatedList = myList.filter(movie => movie.id !== movieId);
    setMyList(updatedList);
    localStorage.setItem('myList', JSON.stringify(updatedList));
  };

  const toggleWatched = (movieId) => {
    let updatedWatched;
    if (watchedMovies.includes(movieId)) {
      updatedWatched = watchedMovies.filter(id => id !== movieId);
    } else {
      updatedWatched = [...watchedMovies, movieId];
    }
    setWatchedMovies(updatedWatched);
    localStorage.setItem('watchedMovies', JSON.stringify(updatedWatched));
  };


  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container py-5">
        <button
          className="btn btn-outline-light mb-3"
          onClick={() => navigate(-1)}
        >
          ← Retour
        </button>
        <h1 className="text-white mb-4">Ma Liste</h1>

        {/* Tous les films de Ma Liste */}
        <section className="mb-5">
          <h2 className="text-white mb-3">
            Mes Films ({myList.length})
          </h2>
          {myList.length === 0 ? (
            <p className="text-muted">Aucun film dans votre liste. Ajoutez des films depuis la page d'accueil !</p>
          ) : (
            <div className="row">
              {myList.map(movie => {
                const isMovieWatched = watchedMovies.includes(movie.id);
                return (
                  <div key={movie.id} className="col-md-3 mb-4">
                    <div className="card bg-dark text-white h-100 position-relative">
                      {/* Badge Film Vu */}
                      {isMovieWatched && (
                        <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
                          <span className="badge bg-success">✓ Vu</span>
                        </div>
                      )}
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          className="card-img-top"
                          alt={movie.title}
                          style={{
                            height: '400px',
                            objectFit: 'cover',
                            opacity: isMovieWatched ? 0.7 : 1
                          }}
                        />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <div className="d-flex gap-2 mt-3 flex-wrap">
                          <button
                            className={`btn btn-sm ${isMovieWatched ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => toggleWatched(movie.id)}
                          >
                            {isMovieWatched ? '✓ Vu' : '👁️ Marquer vu'}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromList(movie.id)}
                          >
                            🗑️ Retirer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MyList;
