import React, { useState } from 'react';
import '../css/login.css';
import { Navigate } from 'react-router-dom';
import { useCookies, CookiesProvider } from 'react-cookie';

type DefaultLoginProps = {
  username?: string;
  onLogin?: (username: string) => void;
};

const DefaultLogin: React.FC<DefaultLoginProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['email', 'password']); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST', // use POST instead of GET
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            const data = await response.json();
    
            if (data.message === "User exists.") {
                console.log(data.user);
    
                // ⚠️ Better: set only a token or username, not password
                setCookie('email', email, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                setCookie('username', data.user.username, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) })
                // Example: if backend gives you a token
                if (data.token) {
                    setCookie('authToken', data.token, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                }
            } 
            else {
                alert("The inputted credentials do not match any current account.");
                console.log("error", data.message);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    
    if (cookies.username) {
        return <Navigate to = '/dashboard' />
    }
    return (
        <div id = "loginbox">
            <h1>Login</h1>
            <input type="text" id="email" name="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
            <input type="text" id="password" name="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default DefaultLogin;
