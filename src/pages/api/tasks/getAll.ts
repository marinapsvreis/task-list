import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if(req.method !== "GET") return res.status(405).end();

	const tasks = await prisma.task.findMany({
		include: {
			subtasks: true
		}
	});

	return res.status(200).json({ tasks });
}
