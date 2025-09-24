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
    const handleSignUp = () => {
      let accountJSON = {
        username: username,
        password: password,
        email: email
      };
      console.log(accountJSON);
    };
    return (
        <div id = "loginbox">
            <h1>Sign Up</h1>
            <input type="text" id="username" name="username" placeholder="Enter your username..." onChange={(e) => setUsername(e.target.value)} />
            <input type="email" id="email" name="email" placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
            <input type="text" id="password" name="password" placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Login</button>
        </div>
    );
};

export default SignUp;
