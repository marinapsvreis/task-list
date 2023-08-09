import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method !== "PUT") {
			return res.status(405).json({ error: "Method not allowed" });
		}

		const bodySchema = z.object({
			name: z.string().max(450),
			checked: z.boolean()
		});

		const validationResult = bodySchema.safeParse(req.body);

		if (!validationResult.success) {
			return res.status(400).json({ error: "Invalid data" });
		}

		const { name, checked } = validationResult.data;

		const taskId = String(req.query.taskId);

		const existingTask = await prisma.task.findUnique({
			where: {
				id: Number(taskId)
			}
		});

		if (!existingTask) {
			return res.status(404).json({ error: "Task not found" });
		}

		const updatedTask = await prisma.task.update({
			where: {
				id: Number(taskId)
			},
			data: {
				name: name,
				checked: checked,
			},
			include: {
				subtasks: true
			}
		});

		return res.status(200).json({ task: updatedTask });
	} catch (error) {
		console.error("Error updating task:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}