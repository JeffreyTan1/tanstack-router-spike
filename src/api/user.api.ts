import { getFakeApiDelay } from "./constants";

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
	await new Promise((resolve) => setTimeout(resolve, getFakeApiDelay()));
	return DUMMY_JWT_TOKEN;
};

const getUser = async () => {
	await new Promise((resolve) => setTimeout(resolve, getFakeApiDelay()));
	return DUMMY_USER;
};

export const userApi = {
	login,
	getUser,
};
