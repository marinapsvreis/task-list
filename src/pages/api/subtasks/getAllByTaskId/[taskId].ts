import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if(req.method !== "GET") return res.status(405).end();

	const taskId = String(req.query.taskId);

	const subtasks = await prisma.subtask.findMany({
		where: {
			taskId: Number(taskId),
		}
	});

	return res.status(200).json({ subtasks });
}