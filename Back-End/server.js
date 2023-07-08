
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import config from './src/database/config.js'
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import projectsRoutes from './src/routes/projectsRoutes.js';


const app = express();
app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );

  //middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
authRoutes(app);
userRoutes(app);
projectsRoutes(app);


//testing my server
app.get('/', (req, res) => {
    res.send(
        'Hello 😎 TaskManagerAPI 😮 Chege;'
    )
});

app.listen(config.port, () => {
    console.log(`Server is 😊 spinning on ${config.url}`);
});