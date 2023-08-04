"use client";

import { Trash } from "@phosphor-icons/react";
import { useState } from "react";

export default function TaskItem() {
	const [checked, setChecked] = useState(false);
	const date = new Date();

	return (
		<div className="flex items-start justify-between p-4 bg-white rounded-lg shadow">
			<div className="flex gap-2">
				<div>
					<input type="checkbox" className="rounded-full form-checkbox" />
				</div>
				<div className="flex flex-col justify-between">
					<h2 className={`antialiased ${checked && "line-through" }`}>Tarefa 1</h2>
					<span className="text-xs font-light text-gray-900/50">{date.toLocaleString()}</span>
				</div>
			</div>
			<div>
				<button>
					<Trash size={16} className="hover:text-red-600"/>
				</button>
			</div>
		</div>	
	);
}