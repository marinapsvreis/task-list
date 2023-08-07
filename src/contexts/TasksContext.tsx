import SubtaskItem from "@/components/SubtaskItem";
import { Subtask, deleteSubtask, postSubtask, updateSubtask } from "@/services/subtasks";
import { Task, deleteTask, getAllTasks, postTask, updateTask } from "@/services/tasks";
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
	};

	const updateTaskList = async (task: Task) => {
		const updatedTask = await updateTask(task);
		const updatedTasksList = tasks.map((taskItem) => {
			if(taskItem.id === task.id){
				if(taskItem.subtasks.length > 0){
					taskItem.subtasks.forEach(async (subtaskItem, i) => {
						updatedTask.subtasks[i].checked = true;
						await updateSubtask(subtaskItem);
					});
				}
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
	
		const tasksUpdatedBySubtask = tasks.map((taskItem) => {
			if (updatedSubtask.taskId === taskItem.id) {
				const updatedSubtasks = taskItem.subtasks.map((subtaskItem) => {
					if (subtaskItem.id === updatedSubtask.id) {
						return updatedSubtask;
					} else {
						return subtaskItem;
					}
				});

				if(updatedSubtasks.some((subtaskItem) => !subtaskItem.checked && taskItem.checked)){
					taskItem.checked = false;
					updateTask(taskItem);
				}
				
				if(!updatedSubtasks.some((subtaskItem) => !subtaskItem.checked && !taskItem.checked)){
					taskItem.checked = true;
					updateTask(taskItem);
				}

				return { ...taskItem, subtasks: updatedSubtasks };
			} else {
				return taskItem;
			}
		});
	
		if (tasksUpdatedBySubtask) {
			setTasks(tasksUpdatedBySubtask);
		}
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
	};

	const deleteSubstaskFromTask = async (subtask: Subtask) => {
		deleteSubtask(subtask.id);
		const tasksListWithoutSubtask = tasks.map((taskItem) => {
			if(taskItem.id === subtask.taskId){
				const updatedSubtasks = taskItem.subtasks.filter((subtaskItem) => subtask.id === subtaskItem.id);
				return { ...taskItem, subtasks: updatedSubtasks };
			} else {
				return taskItem;
			}
		});

		setTasks(tasksListWithoutSubtask);
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