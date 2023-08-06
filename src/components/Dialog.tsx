import { TasksContext } from "@/contexts/TasksContext";
import { useContext, useState } from "react";

interface DialogProps {
  type: "task" | "subtask"
  open: boolean
	taskId?: number
  setOpen: (open: boolean) => void
}

export default function Dialog({ type, open, setOpen, taskId }: DialogProps) {
	const [name, setName] = useState("");
	const { addTaskToList, addSubtaskToTask } = useContext(TasksContext);

	const handleNameChange = (name: string) => {
		setName(name);
	};

	const handleAddTaskOrSubtask = () => {
		if(type === "task"){
			addTaskToList(name);
		} else {
			if(taskId){				
				addSubtaskToTask(name, taskId);
			}
		}
		setName("");
		setOpen(false);
	};
	
	const handleCancelAddTaskOrSubtask = () => {
		setName("");
		setOpen(false);
	};

	return (
		<dialog open={open} className="fixed inset-0 z-10 bg-transparent" onClick={handleCancelAddTaskOrSubtask}>
			<div className="grid w-screen h-screen index bg-black/40 place-items-center">
				<div className="overflow-hidden bg-white rounded-lg shadow-md" onClick={(e) => e.stopPropagation()}>
					<div className="text-white bg-blue-600">
						<p className="px-4 py-2 text-sm">{type === "task" ? "Create task" : "Create subtask"}</p>
					</div>
					<div className="bg-white p-4 rounded-lg space-y-5 min-w-[300px]">
						<div>
							<label htmlFor="" className="text-xs text-gray-900/50">{type === "task" ? "Task" : "Subtask"} name</label>
							<input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} className="mt-1 text-xs w-full bg-white text-[black] border border-solid border-gray-900/50 px-2 py-2 rounded-lg outline-none focus:outline-none focus:border focus:border-solid focus:border-blue-700 focus:ring-0"/>
						</div>
						<form method="dialog" className="flex justify-end gap-2">
							<button className="px-4 py-1 text-sm text-blue-600 border border-blue-600 border-solid rounded-lg hover:border-blue-700 hover:text-blue-700" onClick={handleCancelAddTaskOrSubtask}>Cancel</button>
							<button className="px-4 py-1 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700" onClick={handleAddTaskOrSubtask}>Add</button>
						</form>
					</div>
				</div>
			</div>
		</dialog>
	);
}