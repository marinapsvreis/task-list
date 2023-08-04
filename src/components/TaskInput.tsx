import { PlusCircle } from "@phosphor-icons/react";

export default function TaskInput() {
	return (
		<div className="flex gap-2">
			<input type="text" placeholder="Create a new task..." className="w-full bg-white text-[black] border-none shadow-md px-2 py-2 rounded-lg focus:outline focus:outline-1 outline-purple-500"/>
			<button className="w-36 bg-blue-600 hover:bg-blue-700 transition text-[white] px-2 py-1 rounded-lg flex justify-center items-center gap-1" title="Add new task"><PlusCircle size={16} />New task</button>
		</div>	
	);
}