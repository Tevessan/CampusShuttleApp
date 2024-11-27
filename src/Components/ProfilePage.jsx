import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

function NavBar() {
    return (
        <nav style={navStyles.navbar}>
            <ul style={navStyles.navList}>
                <li style={navStyles.navItem}>
                    <a href="/" style={navStyles.navLink}>Home</a>
                </li>
                <li style={navStyles.navItem}>
                    <a href="/profile" style={navStyles.navLink}>Profile</a>
                </li>
                <li style={navStyles.navItem}>
                    <a href="/logout" style={navStyles.navLink}>Logout</a>
                </li>
            </ul>
        </nav>
    );
}

function ProfilePage() {
    const [user, setUser] = useState({ email: '' });
    const [emailForm, setEmailForm] = useState({ currentEmail: '', newEmail: '' });
    const [passwordForm, setPasswordForm] = useState({ email: '', currentPassword: '', newPassword: '', confirmNewPassword: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserData = () => {
            const email = localStorage.getItem('email');
            setUser({ email });
        };
        fetchUserData();
    }, []);

    const handleEmailChange = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://shuttlenew-hpcqc7e9fhf3gacb.southafricanorth-01.azurewebsites.net/api/auth/update-email', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(emailForm),
            });

            if (!response.ok) {
                const error = await response.text();
                setMessage(`Error: ${error}`);
                return;
            }

            const successMessage = await response.text();
            setMessage(successMessage);
            localStorage.setItem('email', emailForm.newEmail);
            setUser({ email: emailForm.newEmail });
        } catch (error) {
            setMessage('Error updating email');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://shuttlenew-hpcqc7e9fhf3gacb.southafricanorth-01.azurewebsites.net/api/auth/update-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(passwordForm),
            });

            if (!response.ok) {
                const error = await response.text();
                setMessage(`Error: ${error}`);
                return;
            }

            const successMessage = await response.text();
            setMessage(successMessage);
        } catch (error) {
            setMessage('Error updating password');
        }
    };

    return (
        <div>
            <NavBar />
            <div style={styles.container}>
                <FaUserCircle style={styles.profileIcon} />
                <h2 style={styles.header}>Profile Settings</h2>
                
                <form style={styles.form} onSubmit={handleEmailChange}>
                    <h3>Update Email</h3>
                    <input
                        type="email"
                        placeholder="Current Email"
                        value={emailForm.currentEmail}
                        onChange={(e) => setEmailForm({ ...emailForm, currentEmail: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="email"
                        placeholder="New Email"
                        value={emailForm.newEmail}
                        onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>Update Email</button>
                </form>

                <form style={styles.form} onSubmit={handlePasswordChange}>
                    <h3>Update Password</h3>
                    <input
                        type="email"
                        placeholder="Email"
                        value={passwordForm.email}
                        onChange={(e) => setPasswordForm({ ...passwordForm, email: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={passwordForm.confirmNewPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>Update Password</button>
                </form>

                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
}

const navStyles = {
    navbar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px 20px',
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
        gap: '15px',
        margin: 0,
        padding: 0,
    },
    navItem: {
        fontSize: '18px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        transition: 'color 0.3s',
    },
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 60px)', // Adjust for navbar height
        width: '100vw',
        backgroundColor: '#89f7fe',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '20px',
        boxSizing: 'border-box',
    },
    profileIcon: {
        fontSize: '100px',
        color: '#ffffff',
        marginBottom: '20px',
    },
    header: {
        fontSize: '32px',
        marginBottom: '10px',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '100%',
        maxWidth: '300px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#9966CC',
        color: '#fff',
        cursor: 'pointer',
    },
    message: {
        marginTop: '10px',
        color: '#ff0000',
    },
};

export default ProfilePage;
