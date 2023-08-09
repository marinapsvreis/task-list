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

		const subtaskId = String(req.query.subtaskId);

		const existingSubtask = await prisma.subtask.findUnique({
			where: {
				id: Number(subtaskId)
			}
		});

		if (!existingSubtask) {
			return res.status(404).json({ error: "Subtask not found" });
		}

		const updatedSubtask = await prisma.subtask.update({
			where: {
				id: Number(subtaskId)
			},
			data: {
				name: name,
				checked: checked,
			}
		});

		return res.status(200).json({ subtask: updatedSubtask });
	} catch (error) {
		console.error("Error updating subtask:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}