import React, { use, useState } from 'react';
import '../css/login.css';
type DefaultLoginProps = {
  username?: string;
  onLogin?: (username: string) => void;
};

const DefaultLogin: React.FC<DefaultLoginProps> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
      
    };
    return (
        <div id = "loginbox">
            <input type="text" id="username" name="username" placeholder="Enter your username..." onChange={(e) => setUsername(e.target.value)} />
            <input type="text" id="password" name="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default DefaultLogin;
