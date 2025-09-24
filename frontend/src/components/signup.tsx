import React, { useState } from 'react';
import '../css/login.css';
type DefaultSignUpProps = {
  username?: string;
  onLogin?: (username: string) => void;
};

const SignUp: React.FC<DefaultSignUpProps> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleSignUp = async (e) => {
        console.log("sendsdsing");
        e.preventDefault();
        try {
            // Using fetch API
            console.log("sending");
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
            console.log(response);
        } catch (error) {
            console.error('Error sending data:', error);
            // Handle error (e.g., show error message)
        }
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
