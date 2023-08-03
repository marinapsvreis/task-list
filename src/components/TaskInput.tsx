import { Plus } from "@phosphor-icons/react";

export default function TaskInput() {
	return (
		<div className="flex gap-2">
			<input type="text" placeholder="Create a new task..." className="w-full bg-[#f4faff] text-[black] px-2 py-1 rounded-lg focus:outline focus:outline-1 outline-purple-500"/>
			<button className="bg-[#2c4cff] hover:bg-[#0e9ada] transition text-[white] px-2 py-1 rounded-lg flex items-center gap-1" title="Add new task"><Plus size={24} /></button>
		</div>	
	);
}