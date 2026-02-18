import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FilmDetail from './pages/FilmDetail';
import CharacterDetail from './pages/CharacterDetail';
import PlanetDetail from './pages/PlanetDetail';
import StarshipDetail from './pages/StarshipDetail';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/planet/:id" element={<PlanetDetail />} />
        <Route path="/starship/:id" element={<StarshipDetail />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;