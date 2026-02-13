
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { scanCheckpoint } from '../utils/api';

const Checkpoint = () => {
    const { id } = useParams(); // e.g., '1', '2', 'START', 'FINISH'
    const { athlete } = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] = useState('confirm'); // confirm, processing, success, error, duplicate
    const [message, setMessage] = useState('');

    // Map 'START' -> 0, 'FINISH' -> 999
    const getCheckpointId = (idString) => {
        if (!idString) return null;
        if (idString.toUpperCase() === 'START') return 0;
        if (idString.toUpperCase() === 'FINISH') return 999;
        if (idString.toUpperCase().startsWith('CP')) return parseInt(idString.substring(2));
        return parseInt(idString);
    };

    const numericId = getCheckpointId(id);

    // Redirect if not logged in
    useEffect(() => {
        if (!athlete) {
            navigate('/');
        }
    }, [athlete, navigate]);

    const handleScan = async () => {
        setStatus('processing');
        try {
            if (!athlete?.token) return;

            const result = await scanCheckpoint(athlete.token, numericId);
            setStatus('success');
            setMessage(result.message);
        } catch (error) {
            setStatus('error');
            setMessage(error.message);
            if (error.message.includes('already scanned')) {
                setStatus('duplicate');
            }
        }
    };

    if (!athlete) return null;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            background: '#f3f4f6',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#374151'
            }}>
                Checkpoint {numericId === 0 ? 'START' : numericId === 999 ? 'FINISH' : numericId}
            </h2>

            <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px',
                overflow: 'hidden'
            }}>
                {/* Header */}
                <div style={{ background: '#2563eb', padding: '15px', textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: 'white', fontSize: '18px' }}>CONFIRM YOUR SCAN</h3>
                </div>

                <div style={{ padding: '30px' }}>

                    {/* Identity Card */}
                    <div style={{
                        border: '3px solid #3b82f6', // Blue Border as requested
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        background: '#eff6ff',
                        marginBottom: '30px'
                    }}>
                        <p style={{ margin: '0 0 5px 0', color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>Logging For</p>
                        <h2 style={{ margin: '0 0 5px 0', color: '#1f2937', fontSize: '24px' }}>{athlete.name}</h2>
                        <p style={{ margin: 0, color: '#4b5563', fontSize: '14px' }}>
                            {athlete.department} • {athlete.year}
                        </p>
                        {athlete.email && <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '5px' }}>{athlete.email}</p>}
                    </div>

                    {/* Actions */}
                    {status === 'confirm' && (
                        <>
                            <p style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '500' }}>Is this you?</p>
                            <button
                                onClick={handleScan}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    background: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    marginBottom: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                ✓ YES, LOG CHECKPOINT
                            </button>
                            <button
                                onClick={() => navigate('/')} // Logout/Wrong ID logic
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    background: 'white',
                                    color: '#ef4444',
                                    border: '2px solid #ef4444',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                ✗ NO, WRONG ID
                            </button>
                        </>
                    )}

                    {status === 'processing' && (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <div className="spinner"></div>
                            <p>Processing...</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '50px', marginBottom: '10px' }}>✓</div>
                            <h3 style={{ color: '#10b981', margin: '0 0 10px 0' }}>SUCCESS!</h3>
                            <p style={{ color: '#4b5563', marginBottom: '20px' }}>{message}</p>
                            <button
                                onClick={() => navigate(numericId === 999 ? '/finish' : '/leaderboard')}
                                style={{
                                    padding: '12px 24px',
                                    background: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600'
                                }}
                            >
                                {numericId === 999 ? 'See Results' : 'View Leaderboard'}
                            </button>
                        </div>
                    )}

                    {status === 'duplicate' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '50px', marginBottom: '10px' }}>⚠️</div>
                            <h3 style={{ color: '#f59e0b', margin: '0 0 10px 0' }}>ALREADY SCANNED</h3>
                            <p style={{ color: '#4b5563', marginBottom: '20px' }}>{message}</p>
                            <button
                                onClick={() => navigate('/leaderboard')}
                                style={{
                                    padding: '12px 24px',
                                    background: '#2563eb',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600'
                                }}
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '50px', marginBottom: '10px' }}>✗</div>
                            <h3 style={{ color: '#ef4444', margin: '0 0 10px 0' }}>ERROR</h3>
                            <p style={{ color: '#4b5563', marginBottom: '20px' }}>{message}</p>
                            <button
                                onClick={() => setStatus('confirm')}
                                style={{
                                    padding: '12px 24px',
                                    background: '#374151',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600'
                                }}
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Checkpoint;
