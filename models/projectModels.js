const { v4: uuidv4} = require('uuid');

let projects = [
    {
      id: uuidv4(),
      name: "Proyecto A",
      description: "Este es el proyecto A",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      status: "pendiente",
      budget: 10000
    },
    {
      id: uuidv4(),
      name: "Proyecto B",
      description: "Este es el proyecto B",
      startDate: "2024-03-01",
      endDate: "2024-09-01",
      status: "en progreso",
      budget: 25000
    }
  ];

  function getAllProjects() {
    return projects;
  }

  function createProject(data) {
    const newProject = {
        id: uuidv4(),
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        budget: data.budget
    };
    projects.push(newProject);
    return newProject;
}

function getProjectById(id) {
    return projects.find(project => project.id === id);
}

function deleteProject(projectIndex) {
  if (projectIndex !== -1) {
      projects.splice(projectIndex, 1);  // Eliminar el proyecto del arreglo si el índice es válido
  }
}
function getProjectIndexById(id) {
  return projects.findIndex(project => project.id === id);  // Encuentra el índice correcto por ID
}

module.exports = {
  getAllProjects,
  getProjectById,
  deleteProject,
  createProject,
  getProjectIndexById
};
