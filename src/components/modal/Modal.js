import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import localStorageService from "../../service/localStorage";
import { saveTasks } from "../../store/action/userAction";

const TaskCreateModal = ({ show, handleClose }) => {
	const storageTasks = localStorageService.get("tasks");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const { tasks } = useSelector((state) => state.tasks);
	const dispatch = useDispatch();

	const handleChangeTaskName = (e) => {
		const { value } = e.target;
		setName(value);
	};

	const handleChangeTaskDesc = (e) => {
		const { value } = e.target;
		setDescription(value);
	};

	const addTask = () => {
		const newTasks = [...storageTasks, { id: `task-${tasks.length}`, name, description, status: "Todo" }];
		name && description && localStorageService.set("tasks", newTasks);
		dispatch(saveTasks(newTasks));
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header>
				<Modal.Title>Add Task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="px-md-2">
					<Form.Control type="text" className="mb-2" placeholder="Name" value={name} onChange={handleChangeTaskName} />
					<Form.Control type="text" value={description} placeholder="Description" onChange={handleChangeTaskDesc} />
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={addTask}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default TaskCreateModal;
