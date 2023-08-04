import TaskItem from "./TaskItem";

export default function TaskList() {
	return (
		<div className="w-full flex justify-center shadow rounded-lg">
			<div className="w-full h-96 bg-slate-100 rounded-lg text-base text-black flex flex-col gap-1 p-4">
				<TaskItem />	
				<TaskItem />	
				<TaskItem />	
			</div>
		</div>
	);
}