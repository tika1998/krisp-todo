const localStorageService = {
	get(itemName) {
		const item = localStorage.getItem(itemName);

		if (item) {
			return JSON.parse(item);
		} else {
			return [];
		}
	},

	set(key, value) {
		if (typeof value === "object") {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			localStorage.setItem(key, value);
		}
	},
};

export default localStorageService;
