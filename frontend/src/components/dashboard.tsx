import React, { useState } from 'react';
import '../css/dashboard.css';
import { Navigate } from 'react-router-dom';

import { useCookies, CookiesProvider } from 'react-cookie';

type DefaultDashboardProps = {
  username?: string;
  onLogin?: (username: string) => void;
};

const Dashboard: React.FC<DefaultDashboardProps> = (props) => {
    const [cookies] = useCookies(['username', 'password', 'email']); 

    console.log(cookies);
    if (!cookies.username) {
        return <Navigate to="/" replace />;
    }
    const createNewDocument = () => {
        console.log("creating");
    }
    const getDocumentList = async (e) => {
        console.log("sendsdsing");
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:5000/retrievedocuments', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   email: cookies.email
                }),
            });
            const data = await response.json();
            console.log(data);
           
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    return (
        <div>
            <div id = "dashboardheader">
                <span id = "usernameheader">Welcome, {cookies.username}!</span>
                <span id = "circleheader">A</span>
            </div>
            <div id = "createnewdoc">
                <button onClick = {createNewDocument}>+</button>
            </div>
            <div id = "dashboardview">
                <div class = "dashboardcard">
                    12345
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
