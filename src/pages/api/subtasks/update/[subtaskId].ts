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
		checked: z.boolean(),
	});

	const { name, checked } = bodySchema.parse(req.body);

	const subtaskId = String(req.query.subtaskId);

	const subtask = await prisma.subtask.update({
		where: {
			id: Number(subtaskId)
		},
		data: {
			name: name,
			checked: checked,
		}
	});

	return res.status(200).json({ subtask });
}