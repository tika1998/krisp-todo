import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
const Container = styled.div`
	margin: 1rem;
	border: 1px solid lightgrey;
	border-radius: 5px;
	width: 350px;
	display: flex;
	flex-direction: column;
	background-color: white;
`;
const Title = styled.h3`
	padding: 10px;
	font-size: 20px;
`;
const TaskList = styled.div`
	padding: 1rem;
	background-color: ${(props) => (props.isDraggingOver ? "aliceblue" : "inherit")};
	min-height: 300px;
`;

function Column(props) {
	return (
		<Container>
			<Title>{props.column.title}</Title>
			<Droppable droppableId={props.column.id} type="task">
				{(provided, snapshot) => (
					<TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
						{props.tasks.map((task, index) => (
							<Task key={task.id} task={task} index={index} />
						))}
						{provided.placeholder}
					</TaskList>
				)}
			</Droppable>
		</Container>
	);
}

export default Column;
