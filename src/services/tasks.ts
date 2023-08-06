import { api } from "@/lib/axios";
import { Subtask } from "./subtasks";

export interface Task {
	id: number
	name: string
	checked: boolean
	subtasks: Subtask[]
	createdAt: Date
}

export interface Tasks {
	tasks: Task[]
}

export const getAllTasks = async () => {
	const { data } = await api.get<Tasks>("/tasks/getAll", {
		validateStatus: (s) => s === 200 
	});
	return data;
};

export const getTaskById = async () => {};

export const postTask = async (name: string) => {
	const { data } = await api.post("/tasks/create", {
		name: name,
		validateStatus: (s: number) => s === 201
	}); 

	return data.task;
};

export const updateTask = async (task: Task) => {
	const { data } = await api.put(`/tasks/update/${task.id}`, {
		name: task.name,
		checked: !task.checked,
		substasks: task.subtasks,
		validateStatus: (s: number) => s === 201
	}); 

	return data.task;
};

export const deleteTask = async (id: number) => {
	const response = await api.delete(`/tasks/delete/${id}`, {
		validateStatus: (s: number) => s === 204
	});

	return response;
};
