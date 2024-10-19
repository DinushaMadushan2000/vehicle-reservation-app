import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/Navbar.css"; // Update the path if you save it under a different name

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">SAMARASINGHE VEHICLE RESERVATION</Link>
        </div>

        {/* Hamburger Icon */}
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={handleMenuToggle}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link className="nav-item" to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link className="nav-item" to="/book" onClick={() => setMenuOpen(false)}>
            Book
          </Link>
          <Link className="nav-item" to="/view" onClick={() => setMenuOpen(false)}>
            Reservations
          </Link>
          {isAuthenticated && (
            <Link className="nav-item" to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
          )}

          <span>
            {!isAuthenticated ? (
              <button onClick={() => loginWithRedirect()} className="auth-btn login-btn">
                Log In
              </button>
            ) : (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="auth-btn logout-btn"
              >
                Log Out
              </button>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;