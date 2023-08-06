import { useContext } from "react";
import TaskItem from "./TaskItem";
import { TasksContext } from "@/contexts/TasksContext";

export default function TaskList() {
	const { tasks } = useContext(TasksContext);	
	
	return (
		<div className="flex justify-center w-full rounded-lg shadow">
			<div className="flex flex-col w-full gap-1 p-4 text-base text-black rounded-lg min-h-96 bg-slate-100">
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