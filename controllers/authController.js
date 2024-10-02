const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const JWT_SECRET = 'claveSecreta';
const JWT_EXPIRES_IN = '1h';

// Función para crear un nuevo usuario y generar su API key
async function crearUsuario(req, res) {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = userModel.getUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ code: 400, message: "User already exists" });
    }

    // Crear el nuevo usuario y generar la API key
    const newUser = userModel.createUser(username, password);  // Llamar directamente a createUser

    // Retornar la API key generada para el usuario
    res.status(201).json({
        code: 201,
        message: "User created successfully",
        username: newUser.username,
        apiKey: newUser.apiKey // Devolver la API key generada
    });
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = userModel.getUserByUsername(username);
        if (!user) {
            return res.status(403).json({ code: 403, message: "Invalid credentials" });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(403).json({ code: 403, message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { username: user.username },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
        return res.status(200).json({ code: 200, message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    login,
    crearUsuario,
    JWT_SECRET
};
