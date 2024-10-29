const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "claveSecreta";
const JWT_EXPIRES_IN = "60m";

async function login(req, res) {
  const { username, password } = req.body;
  const user = await userModel.getUserByUsername(username);

  console.log(user)

  if (!user)
    return res
      .status(403)
      .json({ code: 403, message: "Usuario no encontrado" });

  

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid)
    return res
      .status(403)
      .json({ code: 403, message: "Contraseña incorrecta" });

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.status(200).json({
    code: 200,
    message: "Inicio de sesión exitoso",
    token,
  });
}

async function register(req, res) {
  const { username, password } = req.body;
  const user = await userModel.getUserByUsername(username);

  console.log(user);

  if (user !== undefined) {
    return res
      .status(403)
      .json({ code: 403, message: "Este usuario ya existe" });
  }

  const cryptpass = bcrypt.hashSync(password, 10);

  const nuevoUsuario = {
    username: username,
    password: cryptpass
  };

  try {
    await userModel.registerUser(nuevoUsuario);
    return res
      .status(201)
      .json({ code: 201, message: "Usuario registrado exitosamente!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, message: "No fue posible registrar el usuario!" });
  }

}

module.exports = { login, JWT_SECRET, register };
