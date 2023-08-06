import { Subtask, postSubtask, updateSubtask } from "@/services/subtasks";
import { Task, deleteTask, getAllTasks, postTask, updateTask } from "@/services/tasks";
import { ReactNode, createContext, useEffect, useState } from "react";

interface TaskContextType {
  tasks: Task[]
  addTaskToList: (name: string) => void
  updateTaskList: (task: Task) => void
	deleteTaskFromList: (id: number) => void
	updateSubtaskList: (subtask: Subtask) => void
	addSubtaskToTask: (name: string, taskId: number) => void
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
	};

	const updateTaskList = async (task: Task) => {
		const updatedTask = await updateTask(task);
		const updatedTasksList = tasks.map((taskItem) => {
			if(taskItem.id === task.id){
				return updatedTask;
			} else {
				return taskItem;
			}
		});
	
		setTasks(updatedTasksList);
	};

	const deleteTaskFromList = (id: number) => {
		deleteTask(id);
		const tasksListWithoutTask = tasks.filter((taskItem) => taskItem.id !== id);
		setTasks(tasksListWithoutTask);
	};

	const updateSubtaskList = async (subtask: Subtask) => {

		const updatedSubtask = await updateSubtask(subtask);
		const updatedSubtasksList = tasks.map((taskItem) => {
			if(taskItem.id === subtask.taskId){
				taskItem.subtasks.map((subtaskItem) => {
					if(subtaskItem.id === subtask.id){
						return updatedSubtask;
					} else{
						return subtask;
					}
				});
			} else {
				return taskItem;
			}
		});

		console.log(updatedSubtasksList);
	
		// setTasks(updatedSubtasksList);
	};

	const addSubtaskToTask = async (name: string, taskId: number) => {
		const subtask = await postSubtask(name, taskId);
		
		if(subtask){
			const tasksUpdated = tasks.map((task) => {
				if(task.id === taskId){
					task.subtasks.push(subtask);
					return task;
				}else{
					return task;
				}
			});

			console.log(tasksUpdated);

			setTasks(tasksUpdated);
		}
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
				addSubtaskToTask
			}}
		>
			{children}
		</TasksContext.Provider>
	);
}