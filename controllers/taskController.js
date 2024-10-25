const taskModel = 
  require("../models/taskModel");

async function getAllTasks(req, res) {
  const username = req.user.username;
  
  const tasks = await taskModel.getAllTasks(username);
  
  if (tasks.length > 0) 
    res.status(200).json(tasks);
  else 
    res.status(404).json({ code:404, message: "No se encontraron tareas" });
}

async function createTask(req, res) {
  const username = req.user.username;
  //Validaciones de estructura
  const newTask = 
    await taskModel.createTask(username, req.body);
  res.status(201).json(newTask);
}

async function updateTask(req, res) {
  const username = req.user.username;
  const taskId = req.params.id;

  console.log(taskId);

  await taskModel.updateTaskById(username, taskId, req.body);
    res.status(201).json({message: "Actualizado existosamente"});
}

async function deleteTask(req, res) {
  const username = req.user.username;
  const taskId = req.params.id;

  console.log(taskId);

  const task = await taskModel.deleteTaskById(username, taskId, req.body);
    res.status(201).json({message: "Borrado existosamente"});
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
}