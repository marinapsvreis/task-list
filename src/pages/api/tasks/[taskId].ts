import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method !== "GET") {
			return res.status(405).json({ error: "Method not allowed" });
		}

		const taskId = String(req.query.taskId);

		const task = await prisma.task.findUnique({
			where: {
				id: Number(taskId)
			},
			include: {
				subtasks: true
			}
		});

		if (!task) {
			return res.status(404).json({ error: "Task not found" });
		}

		return res.status(200).json({ task });
	} catch (error) {
		console.error("Error retrieving task:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}