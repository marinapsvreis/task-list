import { api } from "@/lib/axios";
import { getAllTasks } from "./tasks";

describe("getAllTasks", () => {
	it("should return all tasks when API call is successful", async () => {
		const mockData = {
			tasks: [
				{
					id: 1,
					name: "Task 1",
					checked: false,
					subtasks: [],
					createdAt: new Date()
				},
				{
					id: 2,
					name: "Task 2",
					checked: true,
					subtasks: [],
					createdAt: new Date()
				}
			]
		};
		jest.spyOn(api, "get").mockResolvedValueOnce({ data: mockData, status: 200 });
		const result = await getAllTasks();
		expect(result).toEqual(mockData);
	});
});

