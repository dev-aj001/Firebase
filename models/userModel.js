// const bcrypt = require("bcryptjs");

// let users = [
//   {
//     username: "user 1",
//     password: bcrypt.hashSync("12345", 10), // Contraseña encriptada
//   },
//   {
//     username: "user 2",
//     password: bcrypt.hashSync("password", 10), // Contraseña encriptada
//   },
// ];


// function getUserByUsername(username) {
//   return users.find((user) => user.username === username);
// }

// module.exports = {
//   getUserByUsername
// }
const { collection, getDocs, addDoc, setDoc, doc, getDoc } = require("firebase/firestore");
const { db } = require("../firebase/firebaseConfig");


async function getUserByUsername(username) {
  const docRef = doc(db, "Usuarios", username);
  const docSnap = await getDoc(docRef);

  console.log(docSnap.data())
  return docSnap.data();
}


async function getAllUsers() {
  const querySnapshot = await getDocs(collection(db, "Usuarios"));
  const usuarios = querySnapshot.docs.map(doc => {
    return doc.id;
  });
  return usuarios;
}

async function registerUser(user) {

  await setDoc(doc(db, "Usuarios", user.username), user);

  return user;

}


module.exports = {
  getAllUsers,
  registerUser,
  getUserByUsername
}