import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCreateModal from "../modal/Modal";
import { Button } from "react-bootstrap";
import localStorageService from "../../service/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { saveTasks } from "../../store/action/userAction";
import "./style.css";

const Container = styled.div`
	display: flex;
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	margin: auto;
	width: 90%;
`;

const Todo = () => {
	const dispatch = useDispatch();
	const { tasks } = useSelector((state) => state.tasks);
	const [isShowModal, setShow] = useState(false);

	let dataset = useMemo(
		() => ({
			columns: {
				"column-1": { id: "column-1", title: "Todo", columnTasks: tasks.filter((task) => task.status === "Todo") },
				"column-2": {
					id: "column-2",
					title: "In progress",
					columnTasks: tasks.filter((task) => task.status === "In progress"),
				},
				"column-3": { id: "column-3", title: "Done", columnTasks: tasks.filter((task) => task.status === "Done") },
			},

			columnOrder: ["column-1", "column-2", "column-3"],
		}),
		[tasks]
	);

	useEffect(() => {
		setData(dataset);
	}, [dataset]);

	const [data, setData] = useState(dataset);

	const handleAddTask = () => {
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
	};

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}

		const start = data.columns[source.droppableId];
		const finish = data.columns[destination.droppableId];
		const startTaskIds = Array.from(start.columnTasks);
		const finishTaskIds = Array.from(finish.columnTasks);
		const { title: startTitle } = start;
		const { title: finishTitle } = finish;

		if ((startTitle === "Todo" && finishTitle === "Done") || startTitle === finishTitle) {
			return;
		}

		startTaskIds.splice(source.index, 1);

		finishTaskIds.splice(
			destination.index,
			0,
			tasks.find((el) => el.id === draggableId)
		);

		let changesStatusData = tasks.map((item) => {
			return finishTaskIds.find((el) => el.id === item.id) ? { ...item, status: finishTitle } : item;
		});

		dispatch(saveTasks(changesStatusData));
		localStorageService.set("tasks", changesStatusData);
	};

	return (
		<>
			{isShowModal && <TaskCreateModal show={isShowModal} handleClose={handleClose} />}
			<DragDropContext onDragEnd={onDragEnd}>
				<Content>
					<Droppable droppableId="all-columns" direction="horizontal" type="column">
						{(provided) => (
							<Container {...provided.droppableProps} ref={provided.innerRef}>
								{data &&
									data.columnOrder.map((id, index) => {
										const column = data.columns[id];
										const tasks = column.columnTasks;
										return <Column key={column.id} column={column} tasks={tasks} index={index} />;
									})}
								{provided.placeholder}
							</Container>
						)}
					</Droppable>
				</Content>
				<Button onClick={handleAddTask}>Add task</Button>
			</DragDropContext>
		</>
	);
};

export default Todo;
