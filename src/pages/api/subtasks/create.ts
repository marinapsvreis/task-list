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
			name: z.string().max(450),
			taskId: z.number()
		});

		const validationResult = bodySchema.safeParse(req.body);

		if (!validationResult.success) {
			return res.status(400).json({ error: "Invalid data" });
		}

		const { name, taskId } = validationResult.data;

		await prisma.subtask.create({
			data: {
				name: name,
				taskId: taskId,
				checked: false,
			}
		});

		return res.status(201).end();
	} catch (error) {
		console.error("Error creating subtask:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}