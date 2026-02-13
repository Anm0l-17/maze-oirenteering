
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Protection if accessed directly
    if (!state) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <a href="/">Go to Registration</a>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: '#f3f4f6'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '16px',
                textAlign: 'center',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
                <h1 style={{ color: '#10b981', marginBottom: '10px' }}>REGISTRATION SUCCESSFUL!</h1>
                <p style={{ color: '#6b7280', marginBottom: '30px' }}>You are now ready to participate in the Maze Orienteering challenge.</p>

                <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                    <p style={{
                        textTransform: 'uppercase',
                        color: '#6b7280',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        letterSpacing: '1px'
                    }}>
                        Your Unique ID
                    </p>
                    <div style={{
                        background: '#eff6ff',
                        border: '2px solid #3b82f6',
                        borderRadius: '12px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            fontSize: '24px',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            marginBottom: '5px'
                        }}>
                            {/* Display first 8 chars of token purely for visual simplicity in User Request, 
                                 but actually showing full name is better for verification */}
                            {state.name}
                        </div>
                        <div style={{ fontSize: '14px', color: '#6b7280', wordBreak: 'break-all' }}>
                            {state.token}
                        </div>
                    </div>
                </div>

                <div style={{
                    background: '#ecfdf5',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '30px',
                    color: '#065f46',
                    fontSize: '14px'
                }}>
                    <strong>TIP:</strong> If a QR code opens in a new tab, you will stay logged in! Just make sure to use the <strong>same browser app</strong> (e.g. Chrome/Safari) for all scans.
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <p style={{ fontWeight: '500', marginBottom: '15px' }}>Ready to start?</p>
                    <button
                        onClick={() => navigate('/checkpoint/START')}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
                        }}
                    >
                        Proceed to START Point 🚀
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
