import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './EntryForms.css';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username || !fullName || !email || !password) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const authUrl = '/api';
            const response = await fetch(`${authUrl}/User`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    full_name: fullName,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.detail || 'Failed to create account');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
            console.error('Sign up error:', err);
        }
    };

    return (
        <div className="sign-up">
            <h1>Create an Account</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="horizontal-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="primary-button">Sign Up</button>
                </div>

                <div className="form-group text-center">
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;

