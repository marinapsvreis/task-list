import { postTask } from "@/services/tasks";
import { useState } from "react";

interface DialogProps {
  type: "task" | "subtask"
  open: boolean
  setOpen: (open: boolean) => void;
}

export default function Dialog({ type, open, setOpen }: DialogProps) {
	const [name, setName] = useState("");

	const handleNameChange = (name: string) => {
		setName(name);
	};

	const handleAddTask = () => {
		if(type === "task"){
			postTask(name);
			setOpen(false);
		} else {
			console.log(`Salvar uma subtask ${name}`);
		}
	};

	return (
		<dialog open={open} className="bg-red-500" onClick={() => setOpen(false)}>
			<div className="fixed inset-0 w-screen h-screen bg-black/40 grid place-items-center">
				<div className="bg-white shadow-md rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
					<div className="bg-blue-600 text-white">
						<p className="text-sm px-4 py-2">{type === "task" ? "Create task" : "Create subtask"}</p>
					</div>
					<div className="bg-white p-4 rounded-lg space-y-5 min-w-[300px]">
						<div>
							<label htmlFor="" className="text-xs text-gray-900/50">{type ? "Task" : "Subtask"} name</label>
							<input type="text" onChange={(e) => handleNameChange(e.target.value)} className="mt-1 text-xs w-full bg-white text-[black] border border-solid border-gray-900/50 px-2 py-2 rounded-lg outline-none focus:outline-none focus:border focus:border-solid focus:border-blue-700 focus:ring-0"/>
						</div>
						<form method="dialog" className="flex justify-end gap-2">
							<button className="text-sm border border-solid border-blue-600 hover:border-blue-700 rounded-lg px-4 py-1 text-blue-600 hover:text-blue-700" onClick={() => setOpen(false)}>Cancel</button>
							<button className="text-sm bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-1 text-white" onClick={handleAddTask}>Add</button>
						</form>
					</div>
				</div>
			</div>
		</dialog>
	);
}