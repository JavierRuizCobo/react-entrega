import { useLocation } from 'react-router-dom';
import './styles/errorStyle.css';


const ErrorPage = () => {
  const location = useLocation();
  const errorMessage = location.state ? location.state.errorMessage : 'Error desconocido';

  return (
    <div>
      <h2>Error</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
