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

		const subtasks = await prisma.subtask.findMany();

		return res.status(200).json({ subtasks });
	} catch (error) {
		console.error("Error retrieving subtasks:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}