
import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkTokenStatus, validateToken } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [athlete, setAthlete] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('athleteToken');
            if (storedToken) {
                try {
                    const data = await checkTokenStatus(storedToken);
                    setAthlete({ ...data, token: storedToken });
                } catch (error) {
                    console.error('Session expired or invalid:', error);
                    localStorage.removeItem('athleteToken');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (token) => {
        try {
            const data = await validateToken(token);
            if (data.valid) {
                const athleteData = { ...data, token };
                setAthlete(athleteData);
                localStorage.setItem('athleteToken', token);
                return { success: true };
            } else {
                return { success: false, message: 'Invalid token' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        setAthlete(null);
        localStorage.removeItem('athleteToken');
    };

    const value = {
        athlete,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
