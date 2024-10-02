const projectModel = require("../models/projectModels"); // Importar el modelo correctamente

function getAllProjects(req, res) {
    const projects = projectModel.getAllProjects();
    if (projects.length > 0) {
        res.status(200).json(projects);
    } else {
        res.status(404).json({ message: "No projects found" });
    }
}

function createProject(req, res) {
    // Validaciones de estructura
    const newProject = projectModel.createProject(req.body);
    res.status(201).json(newProject);
}

module.exports = {
    getAllProjects,
    createProject
};
