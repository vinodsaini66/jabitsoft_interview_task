import { createContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { AuthContextType, User } from '../types/user';
import { Navigate } from 'react-router-dom';


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useLocalStorage<string>('token', "");
    const [user, setUser] = useLocalStorage<User | null>('user', null);

    const login = (token: string, user: User) => {
        setUser(user);
        setToken(token);
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; 
    };

    const register = (token: string, user: User) => {
        setUser(user);
        setToken(token);
    };
 

    return (
        <AuthContext.Provider value={{ user, login, logout, register, token }}>
            {children}
        </AuthContext.Provider>
    );
};

