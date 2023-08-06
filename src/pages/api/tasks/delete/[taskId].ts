import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if(req.method !== "DELETE") return res.status(405).end();

	const taskId = String(req.query.taskId);

	const task = await prisma.task.delete({
		where: {
			id: Number(taskId)
		}
	});

	if(!task) return res.status(404).end();

	return res.status(204).end();
}
