const initialState = {
	logedIn: false,
};

export default function loginReducer(state = initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				logedIn: true,
			};
		default:
			return state;
	}
}
