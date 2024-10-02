const express = require("express");
const projectController = require("../controllers/projectControllers");
const authMiddleware = require("../middleware/authMiddleware");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


router.get('/',authenticateToken, projectController.getAllProjects);
router.post('/', authenticateToken, projectController.createProject);
router.put('/:id', authenticateToken, projectController.updateProject);
router.delete('/:id', authenticateToken, projectController.deleteProject); // Ruta DELETE protegida
module.exports = router;