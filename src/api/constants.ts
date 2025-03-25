const MAX_FAKE_API_DELAY = 6000;

export const getFakeApiDelay = () => {
	return Math.random() * MAX_FAKE_API_DELAY;
};
