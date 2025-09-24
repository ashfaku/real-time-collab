import './index.css';
import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLogin from './components/DefaultLogin';

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLogin />,
  },
  {
    path: '/login',
    element: <div>123</div>,
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
