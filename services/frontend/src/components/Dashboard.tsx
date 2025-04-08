import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="container">
                    <h1>Game Platform Dashboard</h1>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>

            <main className="container dashboard-content">
                <div className="welcome-panel">
                    <h2>Welcome to the Game Platform</h2>
                    <p>You are now logged in and can access all features of the platform.</p>
                </div>

                <div className="dashboard-panels">
                    <div className="panel">
                        <h3>My Games</h3>
                        <p>You haven't joined any games yet.</p>
                        <button className="primary-button">Find Games</button>
                    </div>

                    <div className="panel">
                        <h3>Notifications</h3>
                        <p>No new notifications.</p>
                    </div>

                    <div className="panel">
                        <h3>Friends</h3>
                        <p>Connect with other players.</p>
                        <button className="primary-button">Find Friends</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;