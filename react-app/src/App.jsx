// App.jsx pour Xamaflix
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Todos from './pages/Todos';
import Contact from './pages/Contact';
import MyList from './pages/MyList';

function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/contact" element={<Contact />} />
          {/* Routes à venir */}
          <Route path="/series" element={
            <div className="container mt-5">
              <div className="alert alert-info text-center">
                <h2>🚧 Page Séries en construction</h2>
                <p>Cette page sera bientôt disponible!</p>
              </div>
            </div>
          } />
          <Route path="/ma-liste" element={<MyList />} />
          {/* 404 - Page non trouvée */}
          <Route path="*" element={
            <div className="container mt-5">
              <div className="alert alert-warning">
                <h2>404 - Page non trouvée</h2>
                <p>Cette page n'existe pas.</p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
