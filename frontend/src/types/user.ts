
export type User = {
    name: string;
    email: string;
};

export type AuthContextType = {
    user: User | null | string;
    token: string;
    login: (token: string, user: User) => void;
    register: (token: string, user: User) => void;
    logout: () => void;
};