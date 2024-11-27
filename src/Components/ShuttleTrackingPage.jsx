import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './ShuttleTrackingPage.css';
import 'leaflet/dist/leaflet.css';

// Custom shuttle icon
const shuttleIcon = new L.Icon({
    iconUrl: '/ShuttleService logo.jpg',
    iconSize: [30, 30],
});

// Custom component to move a marker along a trail with a countdown timer
function MovingMarker({ trailCoordinates, name }) {
    const [currentPosition, setCurrentPosition] = useState(trailCoordinates[0]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [timeRemaining, setTimeRemaining] = useState(360); // 6 minutes in seconds

    // Countdown timer
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000); // Decrement every second

        return () => clearInterval(countdown);
    }, []);

    // Marker movement logic
    useEffect(() => {
        if (!trailCoordinates || trailCoordinates.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = prevIndex + direction;
                if (nextIndex >= trailCoordinates.length || nextIndex < 0) {
                    setDirection(-direction); // Reverse direction
                    return prevIndex; // Keep the current index
                }
                return nextIndex;
            });
        }, 5000); // Change position every 5 seconds

        return () => clearInterval(interval);
    }, [trailCoordinates, direction]);

    useEffect(() => {
        if (trailCoordinates && trailCoordinates.length > 0) {
            setCurrentPosition(trailCoordinates[index]);
        }
    }, [index, trailCoordinates]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return currentPosition ? (
        <Marker position={currentPosition} icon={shuttleIcon}>
            <Popup>
                {name} <br />
                Time Remaining: {formatTime(timeRemaining)}
            </Popup>
        </Marker>
    ) : null;
}

function ShuttleTrackingPage() {
    const sandtonCoordinates = { lat: -26.1076, lng: 28.0567 };
    const varsityCollegeCoordinates = { lat: -26.0936, lng: 28.0477 };
    const [trailCoordinates, setTrailCoordinates] = useState([]);

    useEffect(() => {
        const loadGoogleMapsApi = () => {
            return new Promise((resolve, reject) => {
                if (window.google) {
                    resolve(window.google);
                } else {
                    const script = document.createElement('script');
                    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsRj3LZPeiEJa0wW9BO6MA91EoGktzv1k&libraries=places`;
                    script.async = true;
                    script.onload = () => resolve(window.google);
                    script.onerror = (error) => reject(error);
                    document.body.appendChild(script);
                }
            });
        };

        loadGoogleMapsApi()
            .then(() => {
                const directionsService = new window.google.maps.DirectionsService();
                const request = {
                    origin: sandtonCoordinates,
                    destination: varsityCollegeCoordinates,
                    travelMode: 'DRIVING',
                };

                directionsService.route(request, (response, status) => {
                    if (status === 'OK') {
                        const route = response.routes[0].overview_path.map((point) => [point.lat(), point.lng()]);
                        setTrailCoordinates(route);
                    } else {
                        console.error('Directions request failed due to ', status);
                    }
                });
            })
            .catch((err) => console.error('Error loading Google Maps API:', err));
    }, []);

    return (
        <div className="map-container">
            <h2 className="title">Shuttle Tracking</h2>
            <MapContainer center={[sandtonCoordinates.lat, sandtonCoordinates.lng]} zoom={14} className="map-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[sandtonCoordinates.lat, sandtonCoordinates.lng]} icon={shuttleIcon}>
                    <Popup>Gautrain Station: Sandton</Popup>
                </Marker>
                <Marker position={[varsityCollegeCoordinates.lat, varsityCollegeCoordinates.lng]} icon={shuttleIcon}>
                    <Popup>Varsity College Sandton</Popup>
                </Marker>
                {trailCoordinates.length > 0 && (
                    <>
                        {/* Red line */}
                        <Polyline positions={trailCoordinates} color="red" />
                        {/* Moving Markers */}
                        <MovingMarker trailCoordinates={trailCoordinates} name="Shuttle 1" />
                        <MovingMarker
                            trailCoordinates={[...trailCoordinates].reverse()} // Reverse trail for Shuttle 2
                            name="Shuttle 2"
                        />
                    </>
                )}
            </MapContainer>
        </div>
    );
}

export default ShuttleTrackingPage;
