"use client";

import { createContext, useContext, ReactNode } from "react";
import { User } from "@supabase/supabase-js";

type UserRole = "candidate" | "employer" | null;

interface AuthContextType {
    user: User | null;
    role: UserRole;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
});

export function AuthProvider({
    children,
    initialUser,
    initialRole,
}: {
    children: ReactNode;
    initialUser: User | null;
    initialRole: UserRole;
}) {
    const loading = initialUser === undefined || initialRole === undefined;

    return (
        <AuthContext.Provider value={{ user: initialUser ?? null, role: initialRole ?? null, loading }}>
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