const projectModel = require("../models/projectModels"); // Importar el modelo correctamente

function getAllProjects(req, res) {
    const projects = projectModel.getAllProjects();
    if (projects.length > 0) {
        res.status(200).json(projects);
    } else {
        res.status(404).json({ message: "No projects found" });
    }
}

/*function createProject(req, res) {
    // Validaciones de estructura
    const newProject = projectModel.createProject(req.body);
    res.status(201).json(newProject);
}*/
function createProject(req, res){
    const { name, description, startDate, endDate, status, budget} = req.body;

    if(!name || !description || !startDate || !endDate || !status || !budget){
        return res.status(400).json({code : 400, message: "All fields are required"});
}
    const newProject = projectModel.createProject(req.body);
    res.status(201).json({
        code: 201,
        message: "Project created successfully",
        project: newProject
    });
}

function updateProject(req, res){
    const { id } = req.params;
    const { name, description, startDate, endDate, status, budget} = req.body;

    const project = projectModel.getProjectById(id);
    if(!project){
        return res.status(404).json({code : 404, message: "Project not found"});
    }
    // Actualizar los campos del proyecto
    project.name = name || project.name;
    project.description = description || project.description;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.status = status || project.status;
    project.budget = budget || project.budget;

    res.status(200).json({
        code: 200,
        message: "Project updated successfully",
        project
    });
}
function deleteProject(req, res) {
    const { id } = req.params;

    // Obtener el índice del proyecto a eliminar
    const projectIndex = projectModel.getProjectIndexById(id);
    
    if (projectIndex === -1) {
        return res.status(404).json({ message: "Project not found" });
    }

    // Eliminar el proyecto por su índice
    projectModel.deleteProject(projectIndex);

    res.status(200).json({
        code: 200,
        message: "Project deleted successfully"
    });
}
module.exports = {
    getAllProjects,
    updateProject,
    deleteProject,
    createProject
};
