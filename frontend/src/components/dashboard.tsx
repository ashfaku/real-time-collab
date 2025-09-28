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
    const [createdNewDoc, createNewDoc] = useState(false);
    const [newDocID, setNewDocID] = useState(-1);
    console.log(cookies);
    if (!cookies.username) {
        return <Navigate to="/" replace />;
    }
    const createNewDocument = async (e) => {
        e.preventDefault();
        try {
            console.log(cookies.email);
            const response = await fetch('http://localhost:5000/createdoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    creator: cookies.email
                }),
            });
            const data = await response.json();
            if (data.message == "Created new document!") {
                console.log("new doc created");
                console.log(data);
                createNewDoc(true)
                setNewDocID(data.id);
            }
            else {
                console.log("error");
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
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
    if (createdNewDoc) {
        return <Navigate to={`/document/${newDocID}`} replace />;
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
                <div className = "dashboardcard">
                    12345
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
