import { TasksContext } from "@/contexts/TasksContext";
import { Subtask } from "@/services/subtasks";
import React, { useContext } from "react";

interface SubtaskItemProps {
	subtask: Subtask
}

export default function SubtaskItem({ subtask }: SubtaskItemProps) {
	const { updateSubtaskList } = useContext(TasksContext);
  
	return (
		<div className="flex items-center gap-2 mt-2 ml-6">
			<input type="checkbox" checked={subtask.checked} onChange={() => updateSubtaskList(subtask)} className="rounded-full cursor-pointer form-checkbox focus:ring-white w-[20px] h-[20px]" />
			<p className={`${subtask.checked && "line-through" }`}>{subtask.name}</p>
		</div>
	);
}