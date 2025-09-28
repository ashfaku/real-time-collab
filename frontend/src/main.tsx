import './index.css';
import App from './App';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLogin from './components/DefaultLogin';
import Welcome from './components/Welcome';
import SignUp from './components/signup';
import Dashboard from './components/dashboard';
import Document from './components/document';
import { CookiesProvider, useCookies } from 'react-cookie';

// Define your routes
const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/login', element: <DefaultLogin /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/document/:id', element: <Document /> }
]);

// Wrapper component to clear cookies at app start
function AppWrapper() {
  const [cookies, , removeCookie] = useCookies();

  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'development') {
  //     Object.keys(cookies).forEach((cookieName) => {
  //       removeCookie(cookieName, { path: '/' });
  //     });
  //     console.log('Cookies cleared at app start (dev mode).');
  //   }
  // }, []); // runs once

  return <RouterProvider router={router} />;
}

// Get the root element
const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');

// Render the app
createRoot(container).render(
  <StrictMode>
    <CookiesProvider>
      <AppWrapper />
    </CookiesProvider>
  </StrictMode>
);
