# Task Manager API
## Overview
A RESTful API built with Node.js and Express that provides CRUD operations for managing tasks. Tasks are stored in memory with initial data loaded from a JSON file.
## Setup Instructions
1. **Prerequisites**: Node.js (v18+)
2. **Install dependencies**: `npm install`
3. **Start server**: `node app.js`
  - Server runs on http://localhost:3000
## API Endpoints
### GET /tasks
Retrieves all tasks.
```bash
curl http://localhost:3000/tasks
```
### GET /tasks/:id
Retrieves a specific task.
```bash
curl http://localhost:3000/tasks/1
```
### POST /tasks
Creates a new task.
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task", "description":"Task description", "completed":false}'
```
### PUT /tasks/:id
Updates an existing task.
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task", "description":"Updated description", "completed":true}'
```
### DELETE /tasks/:id
Deletes a task.
```bash
curl -X DELETE http://localhost:3000/tasks/1
```
## Testing
Run tests with: `npm test`
## Task Structure
- `id`: Unique identifier (number)
- `title`: Task title (string)
- `description`: Task description (string)
- `completed`: Completion status (boolean)
## Implementation
The API is implemented in [app.js](file:///D:%5CCode%5CGithub%20repo%5Ctask-manager-api-pshri5%5Capp.js) with data initialized from [task.json](file:///D:%5CCode%5CGithub%20repo%5Ctask-manager-api-pshri5%5Ctask.json). Changes are not persisted after server restart.
