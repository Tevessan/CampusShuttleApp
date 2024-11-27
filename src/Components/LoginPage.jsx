import React, { useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = () => {
       axios.post('https://shuttlenew-hpcqc7e9fhf3gacb.southafricanorth-01.azurewebsites.net/api/Auth/login',
            {
                "email": email,
                "password": password
            }
       ).then((response) => {
           localStorage.setItem('jwt', response.data.token);
           navigate("/home");
           //console.log(response.data.token);
        });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome Back!</h2>
            
            <div style={styles.form}>
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
                <button onClick={handleLogin} style={styles.buttonPrimary}>
                    Login
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',     // Center content horizontally
        textAlign: 'center',
        padding: '50px',
        height: '100vh',          // Full viewport height
        width: '100vw',           // Full viewport width
        backgroundColor: '#ADD8E6', // Blue background (same as WelcomePage)
        color: '#000000',            // White text for contrast
    },
    // Other styles remain the same


    title: {
        fontSize: '36px',
        fontWeight: '700',
        marginBottom: '10px',
    },
    subText: {
        fontSize: '16px',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
        maxWidth: '400px',
    },
    input: {
        padding: '12px 15px',
        borderRadius: '25px',
        border: '1px solid #fff',
        fontSize: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        outline: 'none',
    },
    buttonPrimary: {
        padding: '15px',
        backgroundColor: '#fff',
        color: '#ff6584',
        border: 'none',
        borderRadius: '30px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.3s',
    },
};

export default LoginPage;

