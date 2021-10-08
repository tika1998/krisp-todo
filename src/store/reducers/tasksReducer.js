const initialState = {
	tasks: [],
};

export default function tasksReducer(state = initialState, action) {
	switch (action.type) {
		case "SAVE_TASKS":
			return {
				tasks: action.payload,
			};
		default:
			return state;
	}
}
