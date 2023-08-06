import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if(req.method !== "POST") return res.status(405).end();

	const bodySchema = z.object({
		name: z.string().max(450)
	});

	const { name } = bodySchema.parse(req.body);

	const task = await prisma.task.create({
		data: {
			name: name,
			checked: false,
		},
		include: {
			subtasks: true
		}
	});

	return res.status(201).json({ task });
}