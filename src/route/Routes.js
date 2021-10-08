import { useSelector } from "react-redux";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Register from "../components/register/Register";
import SignIn from "../components/signIn/SignIn";
import Todo from "../components/todo-list/Todo";

const PrivateRoute = ({ children, ...rest }) => {
	const { logedIn } = useSelector((state) => state.logedIn);
	return <Route {...rest} render={() => (logedIn ? children : <Redirect to="/login" />)} />;
};

const AuthRoute = ({ children, ...rest }) => {
	const { logedIn } = useSelector((state) => state.logedIn);
	return <Route {...rest} render={() => (!logedIn ? children : <Redirect to="/todo-list" />)} />;
};

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<AuthRoute path="/login" exact>
				<SignIn />
			</AuthRoute>
			<AuthRoute path="/register" exact>
				<Register />
			</AuthRoute>
			<PrivateRoute path="/todo-list" exact>
				<Todo />
			</PrivateRoute>
			<Route>
				<Redirect to="/login" />
			</Route>
		</Switch>
	</BrowserRouter>
);

export default Routes;
