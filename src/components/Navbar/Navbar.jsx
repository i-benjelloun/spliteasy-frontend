// src/components/Navbar.js

import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import './Navbar.css';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <div className="navbar">
      {isLoggedIn && (
        <>
          {location.pathname !== '/groups' && (
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="icon-btn back-btn"
            >
              <i className="fa-solid fa-angle-left fa-2x"></i>
            </button>
          )}
        </>
      )}
      <Link className="text-link" to="/groups">
        <h1 className="app-logo">SplitEasy</h1>
      </Link>
      {isLoggedIn && (
        <button onClick={logOutUser} className="icon-btn logout-btn">
          <i className="fa-solid fa-right-from-bracket fa-2x"></i>
        </button>
      )}

      {/* {!isLoggedIn && (
        <>
          <Link className="text-link" to="/signup">
            <button className="btn">Sign Up</button>
          </Link>
          <Link className="text-link" to="/login">
            <button className="btn">Log In</button>
          </Link>
        </>
      )} */}
    </div>
  );
}

export default Navbar;
