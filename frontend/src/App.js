import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import Admin from './components/admin';

function App() {


  return (
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <li><Link to="/">Home</Link></li>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    */
      <Router>
        <div className="App">
            <nav>
                <ul>
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </div>
    </Router>
    /*</div>*/
  );
}

export default App;

