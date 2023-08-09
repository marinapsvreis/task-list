import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		if (req.method !== "POST") {
			return res.status(405).json({ error: "Method not allowed" });
		}

		const bodySchema = z.object({
			name: z.string().max(450)
		});

		const validationResult = bodySchema.safeParse(req.body);

		if (!validationResult.success) {
			return res.status(400).json({ error: "Invalid data" });
		}

		const { name } = validationResult.data;

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
	} catch (error) {
		console.error("Error creating task:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}