import React from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <header>
                <div className="container">
                    <h1>Multiplayer Game Platform</h1>
                    <p>Welcome to the next-generation multiplayer gaming experience</p>
                </div>
            </header>

            <main className="container">
                <section className="features">
                    <h2>Platform Features</h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <h3>Real-time Multiplayer</h3>
                            <p>Connect with players from around the world in real-time games.</p>
                        </div>

                        <div className="feature-card">
                            <h3>Multiple Game Types</h3>
                            <p>Choose from a variety of game genres and styles.</p>
                        </div>

                        <div className="feature-card">
                            <h3>Social Features</h3>
                            <p>Friend lists, chat, and team formation capabilities.</p>
                        </div>

                        <div className="feature-card">
                            <h3>Competitive Rankings</h3>
                            <p>Climb the leaderboards and improve your skills.</p>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <h2>Ready to Play?</h2>
                    <p>Join thousands of players already on the platform</p>
                    <div className="button-group">
                        <button className="primary-button">Sign Up</button>
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