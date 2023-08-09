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

		const tasks = await prisma.task.findMany({
			orderBy: {
				createdAt: "desc"
			},
			include: {
				subtasks: true
			},
		});

		return res.status(200).json({ tasks });
	} catch (error) {
		console.error("Error retrieving tasks:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}