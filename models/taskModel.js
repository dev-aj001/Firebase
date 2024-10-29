const { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } = require("firebase/firestore");
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

// Validaciones listas
async function createTask(username, data) {

  await addDoc(collection(db, "Usuarios", username, "tareas"), data);

  return data;
}


// 
async function updateTaskById(username, id, data) {
  const task = doc(db, "Usuarios", username, "tareas", id);
  await updateDoc(task, data);
  return data;
}

async function deleteTaskById(username, id) {
  const taskRef = doc(db, "Usuarios", username, "tareas", id);
  const taskSnap = await getDoc(taskRef);
  

  console.log(taskSnap.data());

  if(!taskSnap)
    return null;
    
  await deleteDoc(taskRef);

  return taskSnap.data();
}

module.exports = {
  getAllTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
}