import Header from "@/components/Header";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";

export default function Home() {
	return (
		<div className="bg-[black] w-full h-full fixed -z-1 opacity-90">
			<Header />
			<div className="flex flex-col w-[320px] m-auto gap-4">
				<TaskInput />
				<TaskList />
			</div>
		</div>
	);
}
