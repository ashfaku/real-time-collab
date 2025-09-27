import React from 'react';
import '../css/welcome.css';
import { useCookies, CookiesProvider } from 'react-cookie';

type DefaultWelcomeProps = {

};

const Welcome: React.FC<DefaultWelcomeProps> = (props) => {

  const [cookies, , removeCookie] = useCookies(['username', 'password', 'email']);

  Object.keys(cookies).forEach((cookieName) => {
    removeCookie(cookieName, { path: '/' });
  });
  return (
      <div id = "welcomebox">
        <h1>Welcome to my Real Time Collaboration Project!</h1>
        <div className = "links">
          <a href = '/signup'>Not a user? Sign up.</a>
          <a href = '/login'>Login</a>
        </div>
      </div>
  );
};

export default Welcome;
