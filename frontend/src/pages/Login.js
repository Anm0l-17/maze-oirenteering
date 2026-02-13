
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) return;

        const result = await login(token.trim());

        if (result.success) {
            if (token.length > 5 && token.includes('-')) {
                // Heuristic: if it looks like a UUID, assume athlete
            }
            navigate('/checkpoint/START'); // Default to START after login
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',
            padding: '20px', textAlign: 'center'
        }}>
            <h1>Maze Orienteering</h1>
            <p>Enter your athlete token to begin.</p>

            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter Token (e.g., abc-123-def)"
                    style={{
                        width: '100%', padding: '15px', fontSize: '16px', marginBottom: '15px',
                        borderRadius: '8px', border: '1px solid #ccc'
                    }}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" style={{
                    width: '100%', padding: '15px', fontSize: '16px',
                    backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px'
                }}>
                    LOGIN & START
                </button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <p>OR</p>
                <button
                    onClick={() => alert("QR Scanning feature to be implemented specifically for gathering token")}
                    style={{
                        width: '100%', maxWidth: '400px', padding: '15px', fontSize: '16px',
                        backgroundColor: 'white', color: '#1f2937', border: '2px solid #e5e7eb', borderRadius: '8px'
                    }}
                >
                    📷 SCAN QR CODE
                </button>
            </div>
        </div>
    );
};

export default Login;
