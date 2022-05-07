import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
const API_URL = require('../../utils/consts');

function SignupPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();

      // Sign Up
      const requestBody = { email, password, firstName, lastName };
      const signupResponse = await axios.post(
        `${API_URL}/auth/signup`,
        requestBody
      );

      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      storeToken(loginResponse.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (err) {
      const errorDescription = err.response.data.errorMessage;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
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

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstName}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastName}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account ?</p>
      <Link to={'/login'}>Log In</Link>
    </div>
  );
}

export default SignupPage;
