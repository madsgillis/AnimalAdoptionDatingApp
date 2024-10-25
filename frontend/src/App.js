import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './components/admin';
import AdoptionFeed from './components/feed/news-feed';
import AnimalCards from './components/homepage/homepage';

/* routes: adding separate pages for REACT */
function App() {
  return (
    <Router>
      {/* navigation bar */}
      <div className="App">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a href="/" className="navbar-brand">Find your perfect match!</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to={"/"} className='nav-link'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/admin"} className='nav-link'>Admin Page</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/news-feed"} className='nav-link'>News Feed</Link>
                </li>
              </ul>
              {/* search bar */}
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>

        {/* Routing */}
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/news-feed" element={<AdoptionFeed />} />
          <Route path='/' element={<AnimalCards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;