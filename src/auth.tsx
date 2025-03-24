import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { userApi } from "./api/user.api";

export interface AuthContext {
	isAuthenticated: boolean;
	jwtToken: string | null;
	login: () => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

const LOCAL_STORAGE_KEY = "jwtToken";

function storeJwtToken(jwtToken: string | null) {
	localStorage.setItem(LOCAL_STORAGE_KEY, jwtToken || "");
}

function getJwtToken() {
	return localStorage.getItem(LOCAL_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [jwtToken, setJwtToken] = useState<string | null>(getJwtToken());

	const isAuthenticated = !!jwtToken;

	const logout = useCallback(async () => {
		setJwtToken(null);
		storeJwtToken(null);
		window.location.reload();
	}, []);

	const login = useCallback(async () => {
		setJwtToken(await userApi.login());
		storeJwtToken(jwtToken);
	}, []);

	useEffect(() => {
		storeJwtToken(jwtToken);
	}, [jwtToken]);

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
