import { createProject, assignMembersToProject, getProjectWithMembers, filterProjectsByStatus, filterProjectsByUrgency, filterProjectsByCategory } from "../controllers/projectsRoutesControllers.js";


const projectsRoutes = (app) => {
    app.route('/createProject')
    .post(createProject);

    app.route('/assignMembersToProject')
    .post(assignMembersToProject);

    app.route('/getProjectWithMembers')
    .get(getProjectWithMembers);

    app.route('/filterByStatus/:status')
    .get(filterProjectsByStatus);

    app.route('/filterByUrgency/:urgency')
    .get(filterProjectsByUrgency);

    app.route('/filterByCategory/:category')
    .get(filterProjectsByCategory);
}

export default projectsRoutes;