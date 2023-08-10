import { createMocks } from "node-mocks-http";
import create from "../../../../src/pages/api/tasks/create"; 

describe("createTask", () => {	
	it("when name was passed in body this request, return should create a new task and display 201 http code", async () => {
		const { req, res } = createMocks({
			method: "POST",
			body: {
				name: "New Subtask"
			}
		});

		await create(req, res);

		expect(res._getStatusCode()).toBe(201);
	});

	it("when body is empty in this request, return should diplay error with 400 http code", async () => {
		const { req, res } = createMocks({
			method: "POST",
			body: {}
		});

		await create(req, res);

		expect(res._getStatusCode()).toBe(400);
		expect(res._getJSONData()).toStrictEqual({error: "Invalid data"});
	});

	it("when name id empty in this request, return should diplay error with 400 http code", async () => {
		const { req, res } = createMocks({
			method: "POST",
			body: {
				name: ""
			}
		});

		await create(req, res);

		expect(res._getStatusCode()).toBe(400);
		expect(res._getJSONData()).toStrictEqual({error: "Invalid data"});
	});
});