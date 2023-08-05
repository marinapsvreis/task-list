import { api } from "@/lib/axios";

export interface Task {
	id: number
	name: string
	checked: boolean
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

export const postTask = async () => {};

export const deleteTask = async () => {};

export const updateTask = async () => {};