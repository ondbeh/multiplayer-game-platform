import React from "react";
import './EntryForms.css';

const LogIn: React.FC = () => {
    return (
        <div className="log-in">
            <h1>Log In</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div className="button-group">
                    <button type="submit">Log In</button>
                    <button type="button" className="secondary-button">Forgot Password?</button>
                </div>
                <div className="form-group">
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </form>
        </div>
    );
};
export default LogIn;

