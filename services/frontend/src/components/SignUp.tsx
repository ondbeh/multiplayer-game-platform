import React from "react";
import './EntryForms.css';

const SignUp: React.FC = () => {
    return (
        <div className="sign-up">
            <h1>Sign Up</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Sign Up</button>
                <div className="form-group">
                    <p>Already have an account? <a href="/login">Log In</a></p>
                </div>
            </form>
        </div>
    );
};
export default SignUp;

