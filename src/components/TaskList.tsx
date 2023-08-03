import TaskItem from "./TaskItem";

export default function TaskList() {
	return (
		<div className="w-100 flex justify-center shadow-inner">
			<div className="w-96 h-96 bg-[#dfdfdf] rounded-lg text-base text-black flex flex-col gap-1 p-4">
				<TaskItem />	
				<TaskItem />	
				<TaskItem />	
			</div>
		</div>
	);
}