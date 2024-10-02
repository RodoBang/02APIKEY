const express = require("express");
const projectController = require("../controllers/projectControllers");
const authMiddleware = require("../middleware/authMiddleware");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


router.get('/',authenticateToken, projectController.getAllProjects);

router.post('/',authenticateToken, projectController.createProject);

module.exports = router;