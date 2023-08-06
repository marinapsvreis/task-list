import Header from "@/components/Header";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { TasksContextProvider } from "../contexts/TasksContext";

export default function Home() {
	return (
		<TasksContextProvider>
			<div className="w-full">
				<Header />
				<div className="flex flex-col w-4/5 m-auto gap-4">
					<TaskInput />
					<TaskList />
				</div>
			</div>
		</TasksContextProvider>
	);
}
