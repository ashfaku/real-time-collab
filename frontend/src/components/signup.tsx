import React, { useState } from 'react';
import '../css/login.css';
import { Navigate } from 'react-router-dom';

import { useCookies, CookiesProvider } from 'react-cookie';

type DefaultSignUpProps = {
  username?: string;
  onLogin?: (username: string) => void;
};

const SignUp: React.FC<DefaultSignUpProps> = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['username', 'password', 'email']);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp = async (e) => {
        console.log("sendsdsing");
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                }),
            });
            const data = await response.json();
            if (data.message == "User signed up successfully!") {
                console.log("signed up");
                setCookie('username', username, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                setCookie('password', password, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                setCookie('email', email, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            }
            else {
                console.log("error");
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    if (cookies.username) {
        console.log("redirecting from signup to dashboard");
        return <Navigate to="/dashboard" replace />;
    }
    return (
        <div id = "loginbox">
            <h1>Sign Up</h1>
            <input type="text" id="username" name="username" placeholder="Enter your username..." onChange={(e) => setUsername(e.target.value)} />
            <input type="text" id="email" name="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
            <input type="text" id="password" name="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;
