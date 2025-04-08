import React, { useState } from "react";
import './EntryForms.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LogIn: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // The auth endpoint expects username and password
            const response = await fetch('/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data);
                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="log-in">
            <h1>Log In</h1>

            {error && <div className="error-message">{error}</div>}

            <form className="horizontal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button-group">
                    <button
                        type="submit"
                        className="primary-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Log In'}
                    </button>
                    <button type="button" className="secondary-button">Forgot Password?</button>
                </div>
                <div className="form-group text-center">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LogIn;

