## Project Image

![TaskListHome](https://imgur.com/8AlJ58C.png)

## Getting Started

First, install packages:
```npm i```

You need to run to generate database:
```npx prisma generate```

Command for run the project:
```npm run dev```

You need a .env file to config these too environment variables:
- DATABASE_URL="[ConnectionStringToYourDataBase]"
- DIRECT_URL="[ConnectionStringToYourDataBase]"

## Techs

- React
- Next
- Typescript
- Prisma
- Tailwind CSS
- Zod

## Features

- Adding tasks.
- Adding subtasks.
- Updating tasks (changing status from pending to completed).
- Updating subtasks (changing status from pending to completed).
- Deleting tasks.
- Deleting subtasks.
- When you update a task to completed, all the subtasks are also updated to completed status.
- When you update a task to pending, all the subtasks are set to pending status.
- When you update a subtask to pending and the main task is completed, the main task is updated to pending as well.
- When you mark all subtasks of a task as completed, the main task is also updated to completed.

## Future improvements

- Edit task name field.
- Include category field in a task.
- Include scheduling data in a task.
- Include a drag n drop to order tasks.
- Add unit tests.
