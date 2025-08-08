const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load initial tasks from task.json

const tasksData = require('./task.json');
let tasks = [...tasksData.tasks]; 

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a specific task by its ID
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.status(200).json(task);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;
  
  // Validate required fields
  if (!title || !description || completed === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Validate data types
  if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data types' });
  }
  
  // Generate a new ID (max ID + 1)
  const newId = Math.max(-1, ...tasks.map(task => task.id)) + 1;
  
  const newTask = {
    id: newId,
    title,
    description,
    completed
  };
  
  tasks.push(newTask);
  
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;

  const { title, description, completed } = req.body;
  
  // Validate required fields
  if (!title || !description || completed === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Validate data types
  if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data types' });
  }
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const updatedTask = {
    id,
    title,
    description,
    completed
  };
  
  tasks[taskIndex] = updatedTask;
  
  res.status(200).json(updatedTask);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;

  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  
  res.status(200).json({ message: 'Task deleted successfully' });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;


