import React, { useState } from 'react';
import './AboutUsPage.css';

function AboutUsPage() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`aboutus-page-container ${isFlipped ? 'flipped' : ''}`}>
            <div className="aboutus-page">
                <div className="aboutus-front">
                    <h1>About Us</h1>
                    <button onClick={handleFlip} className="flip-button">Learn More</button>
                </div>
                <div className="aboutus-back">
                    <p>
                        We are a team of six dedicated students passionate about innovative transportation solutions.
                        Our mission is to create a user-friendly shuttle service app that streamlines daily commutes,
                        offering real-time tracking, easy booking, and reliable routes.
                        Combining our technical expertise and creativity, we aim to enhance convenience and efficiency for commuters,
                        making transportation simpler and more accessible for all.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUsPage;
