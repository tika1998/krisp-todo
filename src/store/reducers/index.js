import { combineReducers } from "redux";
import loginReducer from "./loginReducers";
import tasksReducer from "./tasksReducer";

const allReducers = combineReducers({
	logedIn: loginReducer,
	tasks: tasksReducer,
});

export default allReducers;
