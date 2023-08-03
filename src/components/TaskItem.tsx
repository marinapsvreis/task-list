"use client";

import { Trash } from "@phosphor-icons/react";

export default function TaskItem() {
	return (
		<li className="list-none bg-[#f4faff] w-full p-2 rounded-lg flex justify-between items-center gap-2">
			<input type="checkbox" title="Mark as completed"/>
			<p>Tarefa 1</p>
			<button title="Delete task">
				<Trash size={16} className="hover:text-[red] transition"/>
			</button>
		</li>	
	);
}