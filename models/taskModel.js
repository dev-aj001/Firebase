const { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } = require("firebase/firestore");
const { db } = require("../firebase/firebaseConfig");

async function getAllTasks(username) {
  const querySnapshot = await getDocs(collection(db, "Usuarios", username, "tareas"));
  const tasks = querySnapshot.docs.map(doc => {

    data = doc.data();
    data.id = doc.id;

    return data;
  });
  return tasks;
}

async function createTask(username, data) {

  let docRef;

  const newTask = {
    titulo: data.titulo,
    descripcion: data.descripcion,
    estado: false
  }

  try {
    docRef = await addDoc(collection(db, "Usuarios", username, "tareas"), newTask);

  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return newTask;
}

async function updateTaskById(username, id, data) {
  const task = doc(db, "Usuarios", username, "tareas", id);

  await updateDoc(task, {
    estado: data.estado
  });

  return task;
}

async function deleteTaskById(username, id) {
  await deleteDoc(doc(db, "Usuarios", username, "tareas", id));
}

module.exports = {
  getAllTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
}