import { TasksContext } from "@/contexts/TasksContext";
import { Subtask } from "@/services/subtasks";
import { Trash } from "@phosphor-icons/react";
import React, { useContext } from "react";

interface SubtaskItemProps {
	subtask: Subtask
}

export default function SubtaskItem({ subtask }: SubtaskItemProps) {
	const { updateSubtaskList, deleteSubstaskFromTask } = useContext(TasksContext);
  
	return (
		<div className="flex items-center justify-between gap-2 p-2 mt-2 ml-6 rounded-lg shadow bg-gray-500/10">
			<div className="flex gap-2">
				<input type="checkbox" checked={subtask.checked} onChange={() => updateSubtaskList(subtask)} className="rounded-full cursor-pointer form-checkbox focus:ring-white w-[20px] h-[20px]" />
				<p className={`${subtask.checked && "line-through" }`}>{subtask.name}</p>
			</div>
			<button className="flex items-center justify-center pb-1 leading-3 " title="Delete" onClick={() => deleteSubstaskFromTask(subtask)}>
				<Trash size={24} weight="fill" className="pt-1 text-gray-400 hover:text-red-600" />
			</button>
		</div>
	);
}