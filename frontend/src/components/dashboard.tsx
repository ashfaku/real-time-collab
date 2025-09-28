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
    return (
        <div>
            <div id = "dashboardheader">
                <span id = "usernameheader">Welcome, {cookies.username}!</span>
                <span id = "circleheader">A</span>
            </div>
            <div id = "dashboardview">
                
                <div className = "dashboardcard">
                    <div>
                        title
                    </div>
                </div>
                <div class = "dashboardcard">
                    12345
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
