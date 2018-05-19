import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({loggedIn, logout}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">Home</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {loggedIn ? 
            <li className="nav-item">
              <Link className="nav-item nav-link" to="#" onClick={logout}>Logout</Link>
            </li>
            : 
            [
              <li key="signup" className="nav-item">
                <Link className="nav-item nav-link" to="/signup">Signup</Link>
              </li>,
              <li key="login" className="nav-item">
                <Link className="nav-item nav-link" to="/login">Login</Link>
              </li>
            ]            
          }
        </ul>
        <h6><i>(Navbar Component)</i></h6>
      </div>
    </nav>
  );
}

export default Navbar;