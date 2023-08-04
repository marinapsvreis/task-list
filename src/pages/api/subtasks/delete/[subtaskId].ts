import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if(req.method !== "DELETE") return res.status(405).end();

	const subtaskId = String(req.query.subtaskId);

	const subtask = await prisma.subtask.delete({
		where: {
			id: Number(subtaskId)
		}
	});

	if(!subtask) return res.status(404).end();

	return res.status(201).end();
}
