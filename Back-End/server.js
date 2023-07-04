
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'





const app = express();
app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );

  //middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





//testing my server
app.get('/', (req, res) => {
    res.send(
        'Hello 😎 TaskManagerAPI 😮 Chege;'
    )
});

app.listen(config.port, () => {
    console.log(`Server is 😊 spinning on ${config.url}`);
});