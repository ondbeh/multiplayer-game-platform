import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <header>
                <div className="container">
                    <h1>Next generation matchmaking system</h1>
                    <p>Welcome to the next-generation multiplayer gaming experience</p>
                </div>
            </header>

            <main className="container">
                <section className="cta">
                    <h2>Ready to Play?</h2>
                    <p>Join thousands of players already on the platform</p>
                    <div className="button-container">
                        <div className="button-group">
                            <Link to="/login" className="primary-button">Log In</Link>
                            <Link to="/signup" className="primary-button">Sign Up</Link>
                        </div>
                        <button className="secondary-button">Learn More</button>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2025 Multiplayer Game Platform</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;