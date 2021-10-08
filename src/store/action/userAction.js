export function saveTasks(tasks) {
	return {
		type: "SAVE_TASKS",
		payload: tasks,
	};
}
