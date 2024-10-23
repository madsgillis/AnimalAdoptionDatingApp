import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import Admin from './components/admin';
import AdoptionFeed from './components/feed/news-feed';

/* routes: adding separate pages for REACT */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/feed" element={<AdoptionFeed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;