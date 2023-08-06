import logoImg from "@/assets/logo.png";
import Image from "next/image";

export default function Header() {
	return (
		<div className="flex flex-col items-center justify-center w-full pt-4 pb-12 -mb-5 bg-gradient-to-r from-blue-300 to-indigo-500">
			<Image
				src={logoImg}
				width={50}
				height={50}
				alt="Tasklist Logo"
			/>
			<h1>My Task List</h1>
		</div>
	);
}