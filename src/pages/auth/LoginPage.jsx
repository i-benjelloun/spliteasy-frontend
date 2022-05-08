import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
const { login } = require('../../api/auth');

function LoginPage(props) {
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
    const { isLoggedIn, loginErrorMessage } = await login(requestBody);

    if (!isLoggedIn) {
      setErrorMessage(loginErrorMessage);
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
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          required
        />

        <button type="submit">Log In</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet ?</p>
      <Link to={'/signup'}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
