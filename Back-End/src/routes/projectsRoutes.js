import { createProject, assignMembersToProject, getProjectWithMembers, filterProjectsByStatus, filterProjectsByUrgency, filterProjectsByCategory, getProjectByName, deleteProject, updateProjectWithMembers } from "../controllers/projectsRoutesControllers.js";


const projectsRoutes = (app) => {
    app.route('/createProject')
    .post(createProject);

    // app.route('/updateProject/:projectId')
    // .put(updateProject);

    app.route('/assignMembersToProject')
    .post(assignMembersToProject);

    // app.route('/updateAssignedMembers/:projectId')
    // .put(updateAssignedMembers);

    app.route('/getProjectWithMembers')
    .get(getProjectWithMembers);

    app.route('/updateProjectWithMembers/:projectId')
    .put(updateProjectWithMembers);;

    app.route('/deleteProject/:projectId')
    .delete(deleteProject);

    app.route('/getProjectByName/:projectName')
    .get(getProjectByName);

    app.route('/filterByStatus/:status')
    .get(filterProjectsByStatus);

    app.route('/filterByUrgency/:urgency')
    .get(filterProjectsByUrgency);

    app.route('/filterByCategory/:category')
    .get(filterProjectsByCategory);
}

export default projectsRoutes;