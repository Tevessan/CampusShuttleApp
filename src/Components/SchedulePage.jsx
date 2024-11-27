import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SchedulePage() {
    const [capacity, setCapacity] = useState(0);
    const [percentageRemaining, setPercentageRemaining] = useState(0);
    const [schedules, setSchedules] = useState([]);
    const [bookings, setBookings] = useState([]);

    const nextShuttleUrl =
        'https://shuttlenew-hpcqc7e9fhf3gacb.southafricanorth-01.azurewebsites.net/api/Booking/next-shuttle';
    const bookingsUrl =
        'https://shuttlenew-hpcqc7e9fhf3gacb.southafricanorth-01.azurewebsites.net/api/Booking/get-logged-user-booking';

    useEffect(() => {
        fetchNextShuttleData();
        fetchUserBookings();
    }, []);

    const fetchNextShuttleData = async () => {
        try {
            const response = await axios.get(nextShuttleUrl);
            const nextShuttle = response.data.nextShuttle;
            setCapacity(nextShuttle.remainingCapacity);
            setPercentageRemaining(nextShuttle.percentageRemaining);
            setSchedules([
                {
                    destination: nextShuttle.to,
                    time: nextShuttle.time,
                },
            ]);
        } catch (error) {
            console.error('Error fetching next shuttle:', error);
            alert('Error fetching next shuttle data');
        }
    };

    const fetchUserBookings = async () => {
        try {
            const token = localStorage.getItem('jwt_token'); // Assuming token is stored in localStorage
            const response = await axios.get(bookingsUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const bookingsData = response.data.filter(
                (booking) => booking.schedule !== null
            );
            setBookings(bookingsData);
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            alert('Error fetching user bookings');
        }
    };

    return (
        <div style={styles.container}>
            {/* Shuttle Capacity */}
            <div style={styles.capacityContainer}>
                <h2 style={styles.capacityText}>{`${percentageRemaining}%`}</h2>
            </div>

            {/* Next Shuttle */}
            {schedules.map((schedule, index) => (
                <div key={index} style={styles.schedule}>
                    <p>{`Next Shuttle To ${schedule.destination}`}</p>
                    <p style={styles.time}>{schedule.time}</p>
                </div>
            ))}

            {/* User Bookings */}
            <div style={styles.bookingsContainer}>
                <h3>Your Bookings</h3>
                {bookings.length === 0 ? (
                    <p>No bookings found</p>
                ) : (
                    bookings.map((booking, index) => (
                        <div key={index} style={styles.bookingItem}>
                            <p>{`From: ${booking.schedule?.from || 'Unknown'}`}</p>
                            <p>{`To: ${booking.schedule?.to || 'Unknown'}`}</p>
                            <p>{`Time: ${booking.schedule?.time || 'Unknown'}`}</p>
                            <p>{`Seats: ${booking.numberOfSeats}`}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        height: '100vh',
        width: '100vw',
        color: '#000000',
        backgroundColor: '#66CCFF',
        padding: '20px',
        boxSizing: 'border-box',
    },
    capacityContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: '#66a6ff',
        marginBottom: '20px',
    },
    capacityText: {
        fontSize: '36px',
        color: '#00796b',
    },
    schedule: {
        padding: '20px',
        width: '80%',
        maxWidth: '400px',
        textAlign: 'center',
        backgroundColor: 'rgba(179, 229, 252, 0.8)',
        borderRadius: '25px',
    },
    time: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#01579b',
    },
    bookingsContainer: {
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center',
        backgroundColor: 'rgba(179, 229, 252, 0.8)',
        padding: '20px',
        borderRadius: '15px',
    },
    bookingItem: {
        padding: '10px',
        border: '1px solid #01579b',
        margin: '10px 0',
        borderRadius: '10px',
    },
};

export default SchedulePage;
