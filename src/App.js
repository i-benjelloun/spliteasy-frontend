import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate';
import IsAnonymous from './components/IsAnonymous';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <IsPrivate>
              <HomePage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnonymous>
              <SignupPage />
            </IsAnonymous>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnonymous>
              <LoginPage />
            </IsAnonymous>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
