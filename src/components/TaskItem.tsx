"use client";
import { TasksContext } from "@/contexts/TasksContext";
import { Task } from "@/services/tasks";
import {
	Accordion,
	AccordionBody,
} from "@material-tailwind/react";
import { CaretDown, CaretRight, PlusCircle, Trash } from "@phosphor-icons/react";
import React, { useContext, useState } from "react";
import Dialog from "./Dialog";
import SubtaskItem from "./SubtaskItem";

interface TaskItemProps {
	task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
	const [taskOpened, setTaskOpened] = useState(false);
	const { updateTaskList, deleteTaskFromList } = useContext(TasksContext);
	
	const [open, setOpen] = React.useState(0);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleOpenAccordion = (value: any) => {
		setOpen(open === value ? 0 : value);
		setTaskOpened(!taskOpened);
	};

	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenDialog = async () => {
		setOpenDialog(true);
	};

	return (
		<>
			<Dialog type={"subtask"} open={openDialog} setOpen={setOpenDialog} taskId={task.id}/>
			<Accordion open={open === 1} className="flex items-start justify-between bg-white rounded-lg shadow">
				<div className="flex w-full gap-2">
					<button title="Open subtasks" onClick={() => handleOpenAccordion(1)} className="flex items-center justify-center w-16 text-blue-500 rounded-l-lg shadow">
						{ taskOpened ? 
							<CaretDown size={20} weight="fill" /> : 
							<CaretRight size={20} weight="fill" />
						}
					</button>
					<div className="flex flex-col justify-between w-full gap-2 px-4 pt-4 pb-2">
						<div className="flex justify-between w-full">
							<div className="flex gap-2">
								<div>
									<input type="checkbox" checked={task.checked} onChange={() => updateTaskList(task)} className="rounded-full cursor-pointer form-checkbox focus:ring-white w-[20px] h-[20px]" />
								</div>
								<div className="flex flex-col justify-between">
									<h2 className={`antialiased ${task.checked && "line-through" }`}>{task.name}</h2>
									<span className="text-xs font-light text-gray-900/50">Created date: {task.createdAt && new Date(task.createdAt).toLocaleDateString()}</span>
								</div>
							</div>
							<div className="flex items-start justify-normal">
								<button title="Delete" onClick={() => deleteTaskFromList(task.id)}>
									<Trash size={26} weight="fill" className="pt-1 text-gray-400 hover:text-red-600" />
								</button>
							</div>
						</div>
						<AccordionBody className="mt-4 border-t border-solid border-gray-900/10">
							<div>								
								<p className="pl-6 text-gray-500/70">Subtasks list</p>
							</div>
							{
								task.subtasks && task.subtasks.length > 0 ? task.subtasks.map((subtask) => {
									return (
										<SubtaskItem key={subtask.id} subtask={subtask} />
									);
								}) : <p className="ml-6 italic">None subtasks to this task.</p>
							}
							<button disabled={task.checked} onClick={handleOpenDialog} className="flex items-center justify-center gap-1 px-2 py-1 mt-2 ml-4 text-blue-600 transition rounded-lg hover:text-blue-700 disabled:text-gray-200 disabled:cursor-not-allowed" title="Add new task">
								<PlusCircle size={22} />New subtask
							</button>
						</AccordionBody>
					</div>
				</div>
			</Accordion>
		</>
	);
}