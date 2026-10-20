"use client";

import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
} from "react";

type User = {
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}