import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if(req.method !== "GET") return res.status(405).end();

	const subtaskId = String(req.query.taskId);

	const subtask = await prisma.subtask.findUnique({
		where: {
			id: Number(subtaskId)
		}
	});

	if(!subtask) return res.status(404).end();

	return res.json({ subtask });
}
