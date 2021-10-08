import { useState } from "react";
import localStorageService from "../../service/localStorage";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Register = () => {
	const [data, setData] = useState({ userName: "", surname: "", password: "" });
	const [error, setError] = useState("");

	let history = useHistory();

	const handleChange = (value, key) => {
		if (error.length) {
			setError("");
		}
		setData({ ...data, [key]: value });
	};

	const register = () => {
		if (data.userName && data.surname && data.password) {
			localStorageService.set("user", data);
			history.push({ pathname: "/login" });
		} else {
			setError("Fill all marked fields please");
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
								<h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration</h3>
								<Form className="px-md-2">
									<div className="row">
										<Form.Control
											type="text"
											className="mb-2"
											placeholder="Name"
											value={data.userName}
											onChange={(e) => handleChange(e.target.value, "userName")}
										/>
										<Form.Control
											type="text"
											className="mb-2"
											placeholder="Surname"
											value={data.surname}
											onChange={(e) => handleChange(e.target.value, "surname")}
										/>
										<Form.Control
											type="password"
											className="form-control"
											placeholder="Password"
											value={data.password}
											onChange={(e) => handleChange(e.target.value, "password")}
										/>
									</div>
									<Button onClick={register} className="m-3">
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

export default Register;
