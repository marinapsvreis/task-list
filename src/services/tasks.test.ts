import { api } from "@/lib/axios";
import { getAllTasks, getTaskById } from "./tasks";

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

	it("should return an empty array when there are no tasks", async () => {
		jest.spyOn(api, "get").mockResolvedValueOnce({ data: { tasks: []}, status: 200 });
		const result = await getAllTasks();
		expect(result.tasks).toEqual([]);
	});
	
	it("should throw an error when API call fails", async () => {
		jest.spyOn(api, "get").mockRejectedValueOnce(new Error("API Error"));
		await expect(getAllTasks()).rejects.toThrow("API Error");
	});
});




describe("getTaskById", () => {
	it("should return the correct task object when given a valid task ID", async () => {
		const id = 1;
		const expectedData = {
			task: {
				id: 1,
				name: "Task 1",
				checked: false,
				createdAt: new Date(),
				subtasks: [
					{
						id: 1,
						name: "Test Subtask 1",
						checked: false,
						taskId: 1
					},
					{
						id: 2,
						name: "Test Subtask 2",
						checked: false,
						taskId: 1
					}
				]
			}
		};
		jest.spyOn(api, "get").mockResolvedValueOnce({ data: expectedData, status: 200 });
		const task = await getTaskById(id);
		expect(task).toEqual(expectedData.task);
	});
});

