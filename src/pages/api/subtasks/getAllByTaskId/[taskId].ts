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

		const existingTask = await prisma.task.findUnique({
			where: {
				id: Number(taskId)
			}
		});

		if (!existingTask) {
			return res.status(404).json({ error: "Task not found" });
		}

		const subtasks = await prisma.subtask.findMany({
			where: {
				taskId: Number(taskId),
			}
		});

		return res.status(200).json({ subtasks });
	} catch (error) {
		console.error("Error retrieving subtasks:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}