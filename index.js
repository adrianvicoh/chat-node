//importamos express y controladores
import express from "express";
import userRouter from './rutas/userRouter.js';

//instanciamos nueva aplicación express
const app = express();

//necesario para poder recibir datos en json
app.use(express.json());

// Rutas
app.use('/api/users', userRouter);

// servimos front como ruta estática
app.use(express.static('front-chat/dist'));

//arranque del servidor
const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))