export interface User {
	id: string;
	email: string;
	name: string;
}

export const DUMMY_JWT_TOKEN = "dummy-jwt-token";

const DUMMY_USER: User = {
	id: "1",
	email: "test@test.com",
	name: "Test User",
};

const login = async () => {
	return DUMMY_JWT_TOKEN;
};

const getUser = async (jwtToken: string) => {
	if (jwtToken !== DUMMY_JWT_TOKEN) {
		throw new Error("Invalid JWT token");
	}
	return DUMMY_USER;
};

export const userApi = {
	login,
	getUser,
};
