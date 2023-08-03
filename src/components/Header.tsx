import logoImg from "@/assets/logo.png";
import Image from "next/image";

export default function Header() {
	return (
		<div className="flex flex-col justify-center items-center pt-4 pb-12 -mb-4 w-full bg-gradient-to-r from-sky-500 to-indigo-500">
			<Image
				src={logoImg}
				width={50}
				height={50}
				alt="Tasklist Logo"
			/>
			<h1>TaskList</h1>
		</div>
	);
}