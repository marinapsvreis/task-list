import { api } from "@/lib/axios";

export interface Subtask {
	id: number
	name: string
	checked: boolean
	taskId: number
	createdAt: Date
}

export interface Subtasks {
	subtasks: Subtask[]
}

export const postSubtask = async (name: string, taskId: number) => {
	const { data } = await api.post("/subtasks/create", {
		name: name,
		taskId: taskId,
		validateStatus: (s: number) => s === 201
	}); 

	return data.subtask;
};

export const updateSubtask = async (subtask: Subtask) => {
	const { data } = await api.put(`/subtask/update/${subtask.id}`, {
		name: subtask.name,
		checked: !subtask.checked,
		validateStatus: (s: number) => s === 201
	}); 

	return data.subtask;
};

export const deleteSubtask = async (id: number) => {
	const response = await api.delete(`/subtasks/delete/${id}`, {
		validateStatus: (s: number) => s === 204
	});

	return response;
};
