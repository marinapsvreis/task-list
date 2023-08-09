import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method !== "DELETE") {
			return res.status(405).json({ error: "Method not allowed" });
		}

		const subtaskId = String(req.query.subtaskId);

		const existingSubtask = await prisma.subtask.findUnique({
			where: {
				id: Number(subtaskId)
			}
		});

		if (!existingSubtask) {
			return res.status(404).json({ error: "Subtask not found" });
		}

		await prisma.subtask.delete({
			where: {
				id: Number(subtaskId)
			}
		});

		return res.status(204).end();
	} catch (error) {
		console.error("Error deleting subtask:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}