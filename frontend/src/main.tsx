import './index.css';
import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLogin from './components/DefaultLogin';
import Welcome from './components/Welcome';
import SignUp from './components/signup';

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/login',
    element: <DefaultLogin />,
  },
  {
    path: '/signup',
    element: <SignUp />
  }
]);

// Get the root element
const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');

// Create React root and render
createRoot(container).render(
  <div>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </div>
);
