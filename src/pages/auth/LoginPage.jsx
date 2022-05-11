import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
const { login } = require('../../api/auth');

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/groups');
  }

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    const { isLoggedIn, errorMessage } = await login(requestBody);

    if (!isLoggedIn) {
      setErrorMessage(errorMessage);
    } else {
      await authenticateUser();
      navigate('/groups');
    }
  };

  return (
    <div
      className="Login
    Page"
    >
      <h1>Log In</h1>

      <form onSubmit={handleLoginSubmit}>
        <div className="form-label-input">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            required
          />
        </div>

        <div className="form-label-input">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </div>

        <button className="btn" type="submit">
          Log In
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet ?</p>
      <Link className="text-link" to={'/signup'}>
        Sign Up
      </Link>
    </div>
  );
}

export default LoginPage;
