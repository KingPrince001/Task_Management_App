import { login, register } from "../controllers/authRoutesControllers.js";



const authRoutes = (app) => {

  //auth routes
  app.route('/auth/register')
  .post(register);

app.route('/auth/login')
  .post(login);


}

export default authRoutes;


 