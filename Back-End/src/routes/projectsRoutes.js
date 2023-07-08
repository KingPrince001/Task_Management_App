import { createProject, assignMembersToProject } from "../controllers/projectsRoutesControllers.js";


const projectsRoutes = (app) => {
    app.route('/createProject')
    .post(createProject);

    app.route('/assignMembersToProject')
    .post(assignMembersToProject);
}

export default projectsRoutes;