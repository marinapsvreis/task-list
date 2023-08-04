import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if(req.method !== "POST") return res.status(405).end();

	const bodySchema = z.object({
		name: z.string().max(450),
		taskId: z.number()
	});

	const { name, taskId } = bodySchema.parse(req.body);

	await prisma.subtask.create({
		data: {
			name: name,
			taskId: taskId, 
			checked: false,
		}
	});

	return res.status(201).end();
}