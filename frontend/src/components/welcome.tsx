import React from 'react';
import '../css/welcome.css';
type DefaultWelcomeProps = {

};

const Welcome: React.FC<DefaultWelcomeProps> = (props) => {
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
