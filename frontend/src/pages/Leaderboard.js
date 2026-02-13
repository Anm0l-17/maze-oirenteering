
import React, { useState, useEffect } from 'react';
import { fetchLeaderboard } from '../utils/api';
import io from 'socket.io-client';

const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    const loadLeaderboard = async () => {
        try {
            // Logic for live update uses socket, but fallback to fetch
            const result = await fetchLeaderboard(search);
            // The backend endpoint returns array of athletes? Actually endpoint logic handles sorting.
            // Need to confirm structure. Assuming array.
            setData(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadLeaderboard();

        // Connect to Socket.IO
        const socket = io(); // Connects to same host/port if proxy is set

        socket.on('leaderboardUpdate', (newData) => {
            setData(newData);
        });

        return () => socket.disconnect();
    }, []);

    const filteredData = data.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.token && p.token.includes(search))
    );

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center' }}>🏆 Leaderboard</h1>

            <input
                type="text"
                placeholder="Search by Name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: '100%', padding: '10px', marginBottom: '20px',
                    borderRadius: '5px', border: '1px solid #ddd'
                }}
            />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#eee', textAlign: 'left' }}>
                        <th style={{ padding: '10px' }}>Rank</th>
                        <th style={{ padding: '10px' }}>Name</th>
                        <th style={{ padding: '10px' }}>Total Time</th>
                        <th style={{ padding: '10px' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((athlete, index) => (
                        <tr key={athlete._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>{index + 1}</td>
                            <td style={{ padding: '10px' }}>{athlete.name}</td>
                            <td style={{ padding: '10px' }}>
                                {athlete.status === 'finished' && athlete.totalTime
                                    ? `${Math.floor(athlete.totalTime / 1000)}s`
                                    : athlete.status === 'running'
                                        ? '⏱️ In Progress'
                                        : '-'}
                            </td>
                            <td style={{ padding: '10px' }}>
                                {athlete.status === 'finished' ? '🏁 Finished' : '🏃 Running'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
