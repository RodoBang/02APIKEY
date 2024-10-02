const express = require("express");
const bodyParser = require("body-parser");
const projectRouter = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require("./middleware/authMiddleware"); // Importar middleware correctamente

const app = express();

app.use(bodyParser.json());

// Aplicar el middleware de autenticación
app.use("/projects", authenticateToken, projectRouter); 
app.use("/auth", authRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        code: 404,
        message: "Route not found"
    });
});

module.exports = app;
