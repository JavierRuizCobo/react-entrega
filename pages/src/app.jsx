import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicPage from './publicPage';
import LogInSignUp from './logInSignUp';
import AdminPage from './admin';
import ModeratorPage from './moderator';
import UserPage from './user';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/logInSignUp" element={<LogInSignUp/>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/moderator" element={<ModeratorPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={<PublicPage />} />
      </Routes>
    </Router>
  );
};

export default App;
