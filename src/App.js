import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import Navbar from './components/Navbar/Navbar';
import IsPrivate from './components/IsPrivate';
import IsAnonymous from './components/IsAnonymous';
import GroupsPage from './pages/GroupsPage/GroupsPage';
import GroupByIdPage from './pages/GroupByIdPage/GroupByIdPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/groups"
          element={
            <IsPrivate>
              <GroupsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/groups/:groupId"
          element={
            <IsPrivate>
              <GroupByIdPage />
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
