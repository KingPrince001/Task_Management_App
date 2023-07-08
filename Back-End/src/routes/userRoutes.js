import { getUsers } from "../controllers/userRoutesControllers.js";
import { loginRequired } from "../controllers/authRoutesControllers.js";

const userRoutes = (app) => {
    //get all users
    app.route('/users')
    .get(getUsers);
}


export default userRoutes;