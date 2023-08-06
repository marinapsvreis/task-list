import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if(req.method !== "PUT") return res.status(405).end();

	const bodySchema = z.object({
		name: z.string().max(450),
		checked: z.boolean()
	});

	const { name, checked } = bodySchema.parse(req.body);

	const taskId = String(req.query.taskId);

	const task = await prisma.task.update({
		where: {
			id: Number(taskId)
		},
		data: {
			name: name,
			checked: checked,
		},
		include: {
			subtasks: true
		}
	});

	return res.status(200).json({ task });
}