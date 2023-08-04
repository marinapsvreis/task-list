import Header from "@/components/Header";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";

export default function Home() {
	return (
		<div className="w-full h-full fixed">
			<Header />
			<div className="flex flex-col w-4/5 m-auto gap-4">
				<TaskInput />
				<TaskList />
			</div>
		</div>
	);
}
