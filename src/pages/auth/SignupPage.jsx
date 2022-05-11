import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const { signup } = require('../../api/auth');

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Sign Up
    const requestBody = { email, password, firstName, lastName };
    const { isSignedUp, errorMessage } = await signup(requestBody);

    if (!isSignedUp) {
      setErrorMessage(errorMessage);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <div className="form-label-input">
          <label className="form-label">Email</label>
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
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </div>

        <div className="form-label-input">
          <label className="form-label">First Name</label>
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstName}
            required
          />
        </div>

        <div className="form-label-input">
          <label className="form-label">Last Name</label>
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastName}
            required
          />
        </div>

        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account ?</p>
      <Link className="text-link" to={'/login'}>
        Log In
      </Link>
    </div>
  );
}

export default SignupPage;
