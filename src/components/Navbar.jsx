import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = ({ theme, toggleTheme }) => {
  const dispatch = useDispatch();

  // grab user from Redux; derive auth state
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);
  const username = user?.username;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <ul>
        {/* Left side links */}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/add-profile">Add Profiles</Link>
        </li>

        {/* Right side links */}
        <li
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {isAuthenticated ? (
            <>
              <span
                style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: "'Josefin Sans', serif",
                  fontWeight: 700,
                  fontStyle: 'normal',
                }}
              >
                Hello, {username}!
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
