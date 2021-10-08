import { useState } from "react";
import { useDispatch } from "react-redux";
import localStorageService from "../../service/localStorage";
import { useHistory } from "react-router-dom";
import { login } from "../../store/action/loginAction";
import { Button, Form } from "react-bootstrap";

const SignIn = () => {
	const [data, setData] = useState({ userName: "", password: "" });
	const [error, setError] = useState("");
	const userData = localStorageService.get("user");
	const history = useHistory();
	const dispatch = useDispatch();

	const loginData = (value, key) => {
		if (error) {
			setError("");
		}
		setData({ ...data, [key]: value });
	};

	const handleLogin = () => {
		if (!data || !userData) {
			return;
		}
		if (userData && data.userName === userData.userName && data.password === userData.password) {
			dispatch(login());
			history.push({ pathname: "/todo-list" });
		} else {
			setError("Username or password is invalid");
		}
	};

	return (
		<div className="h-100 h-custom">
			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-lg-8 col-xl-6">
						{error ? (
							<div class="alert alert-danger" role="alert">
								{error}
							</div>
						) : null}
						<div className="card rounded-3">
							<div className="card-body p-4 p-md-5">
								<h3 className="mb-5">Sign In</h3>
								<Form>
									<Form.Control
										className="mb-2"
										type="text"
										placeholder="Name"
										value={data.userName}
										onChange={(e) => loginData(e.target.value, "userName")}
									/>
									<Form.Control
										type="password"
										className="form-control"
										placeholder="Password"
										value={data.password}
										onChange={(e) => loginData(e.target.value, "password")}
									/>
									<Button className="m-3" onClick={handleLogin}>
										Sign In
									</Button>
									<Button
										variant="info"
										className="m-3"
										onClick={() => history.push({ pathname: "/register" })}
									>
										Register
									</Button>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
