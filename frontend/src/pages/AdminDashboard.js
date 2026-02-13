
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { createAthlete, deleteAthlete, fetchDashboardStats } from '../utils/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ running: [], notStarted: [], finished: [] });
    const [newAthleteName, setNewAthleteName] = useState('');
    const [createdToken, setCreatedToken] = useState(null);

    useEffect(() => {
        const socket = io();

        // Initial fetch
        fetchDashboardStats().then(setStats).catch(console.error);

        socket.on('adminLiveUpdate', (data) => {
            setStats(data);
        });

        return () => socket.disconnect();
    }, []);

    const handleCreateAthlete = async (e) => {
        e.preventDefault();
        try {
            const result = await createAthlete({ name: newAthleteName });
            setCreatedToken(result.token);
            setNewAthleteName('');
            alert(`Athlete Created! Token: ${result.token}`);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this athlete?')) {
            try {
                await deleteAthlete(id);
            } catch (error) {
                alert(error.message);
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Create Athlete Section */}
                <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                    <h2>Create Athlete</h2>
                    <form onSubmit={handleCreateAthlete}>
                        <input
                            value={newAthleteName}
                            onChange={(e) => setNewAthleteName(e.target.value)}
                            placeholder="Athlete Name"
                            style={{ padding: '10px', width: '200px', marginRight: '10px' }}
                        />
                        <button type="submit" style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none' }}>
                            Create
                        </button>
                    </form>
                    {createdToken && (
                        <div style={{ marginTop: '10px', background: '#d1fae5', padding: '10px' }}>
                            <strong>New Token:</strong> {createdToken}
                        </div>
                    )}
                </div>

                {/* Stats Section */}
                <div>
                    <h2>Stats</h2>
                    <p>Running: {stats.running.length}</p>
                    <p>Finished: {stats.finished.length}</p>
                    <p>Not Started: {stats.notStarted.length}</p>
                </div>
            </div>

            <div style={{ marginTop: '40px' }}>
                <h2>Live Monitor</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>

                    <div>
                        <h3>Running ({stats.running.length})</h3>
                        {stats.running.map(a => (
                            <div key={a.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '5px' }}>
                                <strong>{a.name}</strong> <span style={{ fontSize: '12px', color: '#666' }}>({a.dept || 'N/A'})</span>
                                <br />
                                Last CP: {a.lastCheckpoint}
                                <button onClick={() => handleDelete(a.id)} style={{ float: 'right', color: 'red' }}>X</button>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3>Finished ({stats.finished.length})</h3>
                        {stats.finished.map(a => (
                            <div key={a.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '5px', background: '#ecfdf5' }}>
                                <strong>{a.name}</strong> <span style={{ fontSize: '12px', color: '#666' }}>({a.dept || 'N/A'})</span>
                                <br />
                                Time: {a.totalTime ? Math.floor(a.totalTime / 1000) + 's' : ''}
                                <button onClick={() => handleDelete(a.id)} style={{ float: 'right', color: 'red' }}>X</button>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3>Not Started ({stats.notStarted.length})</h3>
                        {stats.notStarted.map(a => (
                            <div key={a.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '5px' }}>
                                <strong>{a.name}</strong> <span style={{ fontSize: '12px', color: '#666' }}>({a.dept || 'N/A'})</span>
                                <button onClick={() => handleDelete(a.id)} style={{ float: 'right', color: 'red' }}>X</button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
