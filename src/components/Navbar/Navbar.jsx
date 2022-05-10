// src/components/Navbar.js

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import './Navbar.css';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <div className="navbar">
      {isLoggedIn && (
        <>
          <Link className="text-link" to="/groups">
            <button className="btn">Groups</button>
          </Link>
          <button className="btn" onClick={logOutUser}>
            Log Out
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link className="text-link" to="/signup">
            <button className="btn">Sign Up</button>
          </Link>
          <Link className="text-link" to="/login">
            <button className="btn">Log In</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
