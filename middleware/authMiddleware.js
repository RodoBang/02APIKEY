const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT_SECRET = require("../controllers/authController").JWT_SECRET;

function authenticateToken(req, res, next) {
    // Intentar obtener el token JWT desde los headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (token) {
        // Si hay token JWT, verificarlo
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                switch (err.name) {
                    case "JsonWebTokenError":
                        return res.status(403).json({ code: 403, message: "Invalid token" });
                    case "TokenExpiredError":
                        return res.status(403).json({ code: 403, message: "Token expired" });
                    default:
                        return res.status(500).json({ code: 500, message: "Internal server error" });
                }
            }
            req.user = user; // Guardar la información del usuario autenticado
            return next(); // Continuar al siguiente middleware
        });
    } else {
        // Si no hay token JWT, intentar validar la API key
        const { apikey } = req.body;
        
        if (!apikey) {
            return res.status(403).json({ code: 403, message: "No API key or token provided" });
        }

        // Buscar al usuario por API key
        const user = userModel.getUserByApiKey(apikey);
        
        if (!user) {
            return res.status(403).json({ code: 403, message: "Invalid API key" });
        }

        // Si la API key es válida, pasar al siguiente middleware
        req.user = user; // Guardar la información del usuario autenticado
        return next(); // Continuar al siguiente middleware
    }
}

module.exports = authenticateToken;
