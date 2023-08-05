"use client";

import { Task, getAllTasks } from "@/services/tasks";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";



export default function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);

	const getTaskList = async () => {
		try {
			const response = await getAllTasks();
			setTasks(response.tasks); 
		} catch(error){
			console.log(error);
		}		
	};

	useEffect(() => {
		getTaskList();
	}, []);
	
	return (
		<div className="flex justify-center w-full rounded-lg shadow">
			<div className="flex flex-col w-full gap-1 p-4 text-base text-black rounded-lg h-96 bg-slate-100">
				{
					tasks.map((task) => {
						return (
							<TaskItem key={task.id} task={task} />
						);
					})
				}	
			</div>
		</div>
	);
}