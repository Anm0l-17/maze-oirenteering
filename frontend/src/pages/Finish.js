import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Finish = () => {
    const { athlete } = useAuth();
    const navigate = useNavigate();

    const formatTime = (ms) => {
        if (!ms) return '0m 0s';
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f3f4f6',
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '500px',
                width: '100%'
            }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>

                <h1 style={{
                    color: '#10b981',
                    marginBottom: '10px',
                    fontSize: '32px'
                }}>
                    Race Completed!
                </h1>

                <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '18px' }}>
                    Congratulations, <strong>{athlete?.name || 'Athlete'}</strong>!
                    <br />
                    You have successfully finished the maze.
                </p>

                {athlete?.totalTime && (
                    <div style={{
                        background: '#ecfdf5',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '30px',
                        border: '2px solid #10b981'
                    }}>
                        <p style={{ margin: 0, color: '#047857', fontSize: '14px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Your Total Time
                        </p>
                        <p style={{ margin: '5px 0 0 0', color: '#065f46', fontSize: '36px', fontWeight: 'bold' }}>
                            {formatTime(athlete.totalTime)}
                        </p>
                    </div>
                )}

                <button
                    onClick={() => navigate('/leaderboard')}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '18px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                >
                    🏆 View Leaderboard
                </button>
            </div>
        </div>
    );
};

export default Finish;
