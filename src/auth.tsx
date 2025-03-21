import { createContext, useCallback, useContext, useState } from "react";
import { userApi } from "./api/user.api";

export interface AuthContext {
	isAuthenticated: boolean;
	jwtToken: string | null;
	login: () => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [jwtToken, setJwtToken] = useState<string | null>(null);

	const isAuthenticated = !!jwtToken;

	const logout = useCallback(async () => {
		setJwtToken(null);
	}, []);

	const login = useCallback(async () => {
		setJwtToken(await userApi.login());
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, jwtToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
