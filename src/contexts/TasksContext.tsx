import { Subtask, deleteSubtask, postSubtask, updateSubtask } from "@/services/subtasks";
import { Task, deleteTask, getAllTasks, getTaskById, postTask, updateTask } from "@/services/tasks";
import { ReactNode, createContext, useEffect, useState } from "react";

interface TaskContextType {
  tasks: Task[]
  addTaskToList: (name: string) => void
  updateTaskList: (task: Task) => void
	deleteTaskFromList: (id: number) => void
	updateSubtaskList: (subtask: Subtask) => void
	addSubtaskToTask: (name: string, taskId: number) => void
	deleteSubstaskFromTask: (subtask: Subtask) => void
}

export const TasksContext = createContext({} as TaskContextType);

interface TasksContextProviderProps {
  children: ReactNode
}

export function TasksContextProvider({ children }: TasksContextProviderProps) {
	const [tasks, setTasks] = useState<Task[]>([]);

	const getTasksList = async () => {
		try {
			const response = await getAllTasks();
			setTasks(response.tasks); 
		} catch(error){
			console.log(error);
		}		
	};

	const addTaskToList = async (name: string) => {
		const task = await postTask(name);
		
		if(task){
			setTasks([task, ...tasks]);
		}
		getTasksList();
	};

	const updateTaskList = async (task: Task) => {
		const updatedTask = await updateTask(task);

		
		const updatedSubtasks = updatedTask.subtasks.map((subtask: Subtask) => ({
			...subtask,
			checked: updatedTask.checked
		}));
		
		for (const subtask of updatedSubtasks) {
			await updateSubtask({
				...subtask,
				checked: !updatedTask.checked
			});
		}

		await getTasksList();
	};

	const deleteTaskFromList = async (id: number) => {
		deleteTask(id);
		const tasksListWithoutTask = tasks.filter((taskItem) => taskItem.id !== id);
		setTasks(tasksListWithoutTask);
		await getTasksList();
	};

	const updateSubtaskList = async (subtask: Subtask) => {
		await updateSubtask(subtask);
		let taskUpdatedBySubtask = await getTaskById(subtask.taskId);
		
		if(!taskUpdatedBySubtask.checked && !taskUpdatedBySubtask.subtasks.some((subtaskItem: Subtask) => !subtaskItem.checked)){
			taskUpdatedBySubtask = await updateTask(taskUpdatedBySubtask);
		} else if(taskUpdatedBySubtask.checked && taskUpdatedBySubtask.subtasks.some((subtaskItem: Subtask) => !subtaskItem.checked)){
			taskUpdatedBySubtask = await updateTask(taskUpdatedBySubtask);
		}

		const tasksListUpdated = tasks.map((task) => {
			if(task.id === subtask.taskId){
				return taskUpdatedBySubtask;
			} else {
				return task;
			}
		});

		setTasks(tasksListUpdated);
		getTasksList();
	};

	const addSubtaskToTask = async (name: string, taskId: number) => {
		const subtask = await postSubtask(name, taskId);
	
		if (subtask) {
			setTasks((prevTasks) => {
				return prevTasks.map((task) => {
					if (task.id === taskId) {
						const updatedSubtasks = [...task.subtasks, subtask];
						return { ...task, subtasks: updatedSubtasks };
					} else {
						return task;
					}
				});
			});
		}
		getTasksList();
	};

	const deleteSubstaskFromTask = async (subtask: Subtask) => {
		await deleteSubtask(subtask.id);
		const updatedTasksList = tasks.map((taskItem) => {
			if (taskItem.id === subtask.taskId) {
				const updatedSubtasks = taskItem.subtasks.filter((subtaskItem) => subtask.id !== subtaskItem.id);
				return { ...taskItem, subtasks: updatedSubtasks };
			} else {
				return taskItem;
			}
		});

		setTasks(updatedTasksList);
		await getTasksList();
	};

	useEffect(() => {
		getTasksList();
	}, []);

	return (
		<TasksContext.Provider
			value={{
				tasks,
				addTaskToList,
				updateTaskList,
				deleteTaskFromList,
				updateSubtaskList,
				addSubtaskToTask,
				deleteSubstaskFromTask
			}}
		>
			{children}
		</TasksContext.Provider>
	);
}