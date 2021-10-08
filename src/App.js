import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Routes from "./route/Routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/action/loginAction";
import localStorageService from "./service/localStorage";
import { saveTasks } from "./store/action/userAction";

const tasksStrg = localStorageService.get("tasks") ? localStorageService.get("tasks") : [];

const App = () => {
	const userData = localStorageService.get("user");
	const dispatch = useDispatch();

	useEffect(() => {
		if (userData.userName) {
			dispatch(login());
			dispatch(saveTasks(tasksStrg));
		}
	}, [dispatch, userData.userName]);
	return (
		<div className="App">
			<Routes />
		</div>
	);
};

export default App;
