import { TasksContext } from "@/contexts/TasksContext";
import { useContext } from "react";
import TaskItem from "./TaskItem";

export default function TaskList() {
	const { tasks, deleteTaskFromList } = useContext(TasksContext);
	
	const handleClearAllCompletedTasks = () => {
		tasks.forEach((task) => {
			if(task.checked){
				deleteTaskFromList(task.id);
			}
		});	
	};
	
	return (
		<div className="flex flex-col">
			<div className="flex flex-col justify-center w-full rounded-lg shadow bg-gray-100/10">
				<div className="flex flex-col w-full gap-1 p-4 text-base text-black rounded-lg min-h-96 bg-slate-100">
					{
						tasks.map((task) => {
							return (
								<TaskItem key={task.id} task={task} />
							);
						})
					}	
				</div>
				{
					tasks.length > 0 && (
						<button onClick={handleClearAllCompletedTasks} className="flex items-center justify-center w-full p-4 text-blue-500/80">Clear all completed tasks</button>
					)
				}
			</div>
		</div>
	);
}