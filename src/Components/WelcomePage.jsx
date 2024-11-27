import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Enhanced styling with logo animation

function WelcomePage() {
    return (
        <div className="welcome-container">
            <div className="hero-content">
                {/* ShuttleService Logo with round shape and animation */}
                <img src="/ShuttleService logo.jpg" alt="Shuttle Service Logo" className="animated-logo" />

                <h1 className="welcome-title">Welcome to VC Shuttle Service!</h1>
                <p className="welcome-subtext">Joyride with us to your Campus.</p>

                <div className="button-container">
                    <Link to="/register">
                        <button className="button-primary">Register</button>
                    </Link>
                    <Link to="/login">
                        <button className="button-secondary">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
