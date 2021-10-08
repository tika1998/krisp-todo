import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
	padding: 8px;
	margin-bottom: 8px;
	border-radius: 15px;
	background-color: ${(props) => (props.isDragging ? "#aac6de" : "#e8e8e8")};
`;
function Task({ task, index }) {
	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided, snapshot) => (
				<Container
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}
				>
					<h5>{task.name}</h5>
					<p>{task.description}</p>
				</Container>
			)}
		</Draggable>
	);
}

export default Task;
