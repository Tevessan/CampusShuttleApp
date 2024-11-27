import React, { useState } from 'react';
import axios from 'axios'; // Axios for HTTP requests
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        const userData = {
            email,
            password,
            confirmPassword: confirmpassword,
        };

        try {
            const response = await axios.post('https://shuttlenew-hpcqc7e9fhf3gacb.southafricanorth-01.azurewebsites.net/api/Auth/register', userData);
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Error registering:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Create Your Account</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <input
                type="password" // Changed to "password" for proper masking
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleRegister} style={styles.buttonPrimary}>
                Register
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '50px',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#ADD8E6',
        color: '#000000',
    },
    title: {
        fontSize: '36px',
        fontWeight: '700',
        marginBottom: '10px',
    },
    input: {
        padding: '12px 15px',
        borderRadius: '25px',
        border: '1px solid #fff',
        fontSize: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#000000',
        outline: 'none',
        marginBottom: '15px', // Added margin for spacing
    },
    buttonPrimary: {
        padding: '15px',
        backgroundColor: '#000000',
        color: '#007bff',
        border: 'none',
        borderRadius: '30px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.3s',
    },
};

export default RegisterPage;
