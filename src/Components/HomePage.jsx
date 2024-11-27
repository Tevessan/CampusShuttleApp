//import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Using FontAwesome for icons

function HomePage() {
    return (
        <div className="homepage-container">
            {/* Top Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-logo">Shuttle Service</div>
                <ul className="navbar-menu">
                    <li>
                        <Link to="/profile" className="navbar-link">
                            <FaUserCircle size={20} /> Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/tracking" className="navbar-link">
                            Shuttle Tracking
                        </Link>
                    </li>
                    <li>
                        <Link to="/schedule" className="navbar-link">
                            Shuttle Schedule
                        </Link>
                    </li>
                    <li>
                        <Link to="/bookings" className="navbar-link">
                            Bookings
                        </Link>
                    </li>
                    <li>
                        <Link to="/aboutus" className="navbar-link">
                            About Us
                        </Link>
                    </li>
                    <li>
                        
                    </li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <div className="homepage-content">
                <h1>Welcome to the VC Shuttle Service!</h1>
                <p>Stay connected with your campus shuttle</p>
            </div>

            {/* Footer */}
            <div className="footer-bar">
                <div className="contact-info">
                    <h4>Contacts</h4>
                    <p>Email: vcshuttle@edu.za</p>
                    <p>Phone: 011 784 6939</p>
                    
                </div>
                <div className="shuttle-times">
                    <h4>Shuttle Operation times</h4>
                    <p>Monday-Friday</p>
                    <p>Morning: 06:00 - 09:00</p>
                    <p>Midday: 11:30 - 13:00</p>
                    <p>Afternoon: 15:30 - 17:00</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
