import { PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";
import Dialog from "./Dialog";

export default function TaskInput() {
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = async () => {
		setOpenDialog(true);
	};

	return (
		<>
			<div className="flex gap-2">
				<button onClick={handleOpenDialog} className="w-36 bg-blue-600 hover:bg-blue-700 transition text-[white] px-2 py-1 rounded-lg flex justify-center items-center gap-1" title="Add new task"><PlusCircle size={16} />New task</button>
			</div>
			<Dialog type={"task"} open={openDialog} setOpen={setOpenDialog}/>
		</>	
	);
}