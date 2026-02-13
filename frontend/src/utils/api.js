
// On Vercel, we use relative paths so rewrites work automatically
const API_BASE = '/api';

const getHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Though backend uses body token mostly, good practice
    }
    return headers;
};

// Validate token (Login)
export const validateToken = async (token) => {
    const response = await fetch(`${API_BASE}/auth/validate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ token }),
    });

    if (!response.ok) {
        let errorMessage = 'Invalid token';
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } catch (e) {
            errorMessage = await response.text();
        }
        throw new Error(errorMessage);
    }

    return await response.json();
};

// Check token status
export const checkTokenStatus = async (token) => {
    const response = await fetch(`${API_BASE}/auth/status?token=${token}`, {
        headers: getHeaders(token),
    });

    if (!response.ok) {
        throw new Error('Token validation failed');
    }

    return await response.json();
};

// Log checkpoint scan
export const scanCheckpoint = async (token, checkpointId) => {
    const response = await fetch(`${API_BASE}/scan`, {
        method: 'POST',
        headers: getHeaders(token),
        body: JSON.stringify({
            token,
            checkpointId: parseInt(checkpointId)
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Checkpoint scan failed');
    }

    return await response.json();
};

// Fetch leaderboard
export const fetchLeaderboard = async (query = '') => {
    let url = `${API_BASE}/leaderboard`;
    if (query) {
        url += `?q=${encodeURIComponent(query)}`; // Assuming backend supports search query param if implemented
    }
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
    }

    return await response.json();
};

// Admin: Create athlete
export const createAthlete = async (athleteData) => {
    const response = await fetch(`${API_BASE}/admin/create-athlete`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(athleteData)
    });

    if (!response.ok) {
        throw new Error('Failed to create athlete');
    }

    return await response.json();
};

// Public: Register athlete
export const registerAthlete = async (athleteData) => {
    const response = await fetch(`${API_BASE}/admin/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(athleteData)
    });

    if (!response.ok) {
        let errorMessage = 'Registration failed';
        try {
            const error = await response.json();
            errorMessage = error.message || errorMessage;
        } catch (e) {
            errorMessage = await response.text();
            // Handle Vercel 504 Gateway Timeout or similar HTML errors
            if (errorMessage.startsWith('<!DOCTYPE html>')) {
                errorMessage = `Server Error (${response.status}): Check Vercel Logs`;
            }
        }
        throw new Error(errorMessage);
    }

    return await response.json();
};

// Admin: Delete athlete
export const deleteAthlete = async (id) => {
    const response = await fetch(`${API_BASE}/admin/delete-athlete/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error('Failed to delete athlete');
    }

    return await response.json();
};

// Admin: Dashboard Stats
export const fetchDashboardStats = async () => {
    const response = await fetch(`${API_BASE}/admin/live`);

    if (!response.ok) {
        throw new Error('Failed to fetch stats');
    }

    return await response.json();
};
