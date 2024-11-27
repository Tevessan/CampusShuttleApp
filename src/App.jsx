import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage';
import RegisterPage from './Components/RegisterPage';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import AboutUsPage from './Components/AboutUsPage';
import BookingsPage from './Components/BookingsPage'
import SchedulePage from './Components/SchedulePage';
import ShuttleTrackingPage from './Components/ShuttleTrackingPage';
import ProfilePage from './Components/ProfilePage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutUsPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/tracking" element={<ShuttleTrackingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;


