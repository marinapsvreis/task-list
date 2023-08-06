"use client";
import { TasksContext } from "@/contexts/TasksContext";
import { Task } from "@/services/tasks";
import { CaretDown, CaretRight, Trash } from "@phosphor-icons/react";
import { useContext, useState } from "react";

interface TaskItemProps {
	task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
	const [taskOpened, setTaskOpened] = useState(false);
	const { updateTaskList, deleteTaskFromList } = useContext(TasksContext);

	return (
		<div className="flex items-start justify-between bg-white rounded-lg shadow">
			<div className="flex w-full gap-2">
				<button title="Open subtasks" onClick={() => setTaskOpened(!taskOpened)} className="flex items-center justify-center w-16 text-blue-500 rounded-l-lg shadow">
					{ taskOpened ? 
						<CaretDown size={16} weight="fill" /> : 
						<CaretRight size={16} weight="fill" />
					}
				</button>
				<div className="flex justify-between w-full gap-2 px-4 py-2">
					<div className="flex gap-2">
						<div>
							<input type="checkbox" checked={task.checked} onChange={() => updateTaskList(task)} className="rounded-full cursor-pointer form-checkbox focus:ring-white" />
						</div>
						<div className="flex flex-col justify-between">
							<h2 className={`antialiased ${task.checked && "line-through" }`}>{task.name}</h2>
							<span className="text-xs font-light text-gray-900/50">{task.createdAt && task.createdAt.toLocaleString()}</span>
						</div>
					</div>
					<div>
						<button className="pt-1" title="Delete" onClick={() => deleteTaskFromList(task.id)}>
							<Trash size={16} weight="fill" className="text-gray-400 hover:text-red-600" />
						</button>
					</div>
				</div>
			</div>
		</div>	
	);
}