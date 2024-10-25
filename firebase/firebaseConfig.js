// Importar funciones de Firebase usando CommonJS
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Configuración de tu proyecto de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA6feM7t8Dg_3ckHXAUHOoPt7-vktNBabM",
    authDomain: "proyecto-u1-dsw-2f657.firebaseapp.com",
    projectId: "proyecto-u1-dsw-2f657",
    storageBucket: "proyecto-u1-dsw-2f657.appspot.com",
    messagingSenderId: "704625675671",
    appId: "1:704625675671:web:bdbf959f31231dc1c5c8d2",
    measurementId: "G-Y3VJR134KR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Cloud Firestore y obtener una referencia al servicio
const db = getFirestore(app);

// Exportar la instancia de la aplicación y la base de datos
module.exports = { app, db };