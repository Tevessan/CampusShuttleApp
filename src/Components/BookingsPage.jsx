import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingsPage.css';

function BookingReportPage() {
    const [schedules, setSchedules] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('jwt'); // Retrieve token from local storage

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(
                'https://shuttlenew-hpcqc7e9fhf3gacb.southafricanorth-01.azurewebsites.net/api/Schedule',
            );
            if (response.status === 200) {
                setSchedules(response.data);
                setLoading(false);
            } else {
                setMessage('Failed to fetch schedules.');
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setMessage('An error occurred while fetching schedules.');
        }
    };

    const handleBooking = async (scheduleId) => {
        if (!token) {
            alert('JWT Token not found. Please log in again.');
            return;
        }

        try {
            const bookingData = { scheduleId };

            const response = await axios.post(
                'https://shuttlenew-hpcqc7e9fhf3gacb.southafricanorth-01.azurewebsites.net/api/Booking/book',
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                const bookedSchedule = schedules.find(
                    (schedule) => schedule.id === scheduleId
                );
                const time = bookedSchedule?.time || 'Unknown Time';
                const direction = `${bookedSchedule?.from} to ${bookedSchedule?.to}`;

                setMessage(`Booking successful for ${direction} at ${time}.`);
                alert(`Booking Confirmed!\nYour booking from ${direction} at ${time} is successful.`);
            } else {
                setMessage('Failed to book. Please try again.');
            }
        } catch (error) {
            console.error('Error during booking:', error);
            setMessage('An error occurred while booking. Please try again.');
        }
    };

    return (
        <div className="booking-report-container">
            <h1>Booking Report</h1>
            <p>Select a schedule to book your seat.</p>

            {loading ? (
                <p>Loading schedules...</p>
            ) : (
                <ul className="schedule-list">
                    {schedules.map((schedule) => (
                        <li key={schedule.id} className="schedule-item">
                            <div>
                                {schedule.from} to {schedule.to} at {schedule.time} (Capacity: {schedule.capacity})
                            </div>
                            <button
                                className="book-button"
                                onClick={() => handleBooking(schedule.id)}
                            >
                                Book
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {message && <p className="booking-message">{message}</p>}
        </div>
    );
}

export default BookingReportPage;
