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

		const subtaskId = String(req.query.subtaskId);

		const subtask = await prisma.subtask.findUnique({
			where: {
				id: Number(subtaskId)
			}
		});

		if (!subtask) {
			return res.status(404).json({ error: "Subtask not found" });
		}

		return res.status(200).json({ subtask });
	} catch (error) {
		console.error("Error retrieving subtask:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}