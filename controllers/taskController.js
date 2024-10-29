const taskModel =
  require("../models/taskModel");

async function getAllTasks(req, res) {
  const username = req.user.username;

  const tasks = await taskModel.getAllTasks(username);

  if (tasks.length > 0)
    res.status(200).json(tasks);
  else
    res.status(404).json({ code: 404, message: "No se encontraron tareas" });
}

async function createTask(req, res) {
  const username = req.user.username;
  //Validaciones de estructura

  if (!req.body.titulo) {
    return res.status(400).json({ message: "El atributo 'titulo' es requerido! " });
  }

  if (typeof req.body.titulo !== 'string')
    return res.status(400).json({ message: "El atributo 'titulo' debe ser tipo string! " });


  const data = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion || "",
    estado: false
  }

  try {
    const newTask = await taskModel.createTask(username, data);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ code: 500, message: "No se pudo crear la tarea." });
  }
}

async function updateTask(req, res) {
  const username = req.user.username;
  const taskId = req.params.id;

  if (!req.body.titulo) {
    return res.status(400).json({ message: "El atributo 'titulo' es requerido! " });
  }

  if (!req.body.descripcion) {
    return res.status(400).json({ message: "El atributo 'descripcion' es requerido! " });
  }

  if (!req.body.estado) {
    return res.status(400).json({ message: "El atributo 'estado' es requerido! " });
  }

  if (typeof req.body.descripcion !== "string") {
    return res.status(400).json({ message: "El atributo 'descripcion' debe ser de tipo booleano!" });
  }

  if (typeof req.body.estado !== "boolean") {
    return res.status(400).json({ message: "El atributo 'estado' debe ser de tipo booleano!" });
  }

  if (typeof req.body.titulo !== 'string')
    return res.status(400).json({ message: "El atributo 'titulo' debe ser tipo string! " });


  const data = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: req.body.estado
  }

  try {
    const updateTask = await taskModel.updateTaskById(username, taskId, data);
    res.status(201).json(updateTask);
  } catch (error) {
    res.status(500).json({ code: 500, message: "No se pudo actualizar la tarea." });
  }
}

async function deleteTask(req, res) {
  const username = req.user.username;
  const taskId = req.params.id;


  try {
    const task = await taskModel.deleteTaskById(username, taskId);
    if (!task)
      return res.status(404).json({ code: 404, message: "No se encontro la tarea" });

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "No se pudo eliminar la tarea." });
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
}