import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConferencesPage from './pages/ConferencesPage';
import RegistrationPage from './pages/RegistrationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/conferences',
    element: <ConferencesPage />,
  },
  {
    path: '/register/:conferenceId',
    element: <RegistrationPage />,
  },
]);
