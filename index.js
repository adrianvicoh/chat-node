//importamos express y controladores
import express from "express";
import chatRouter from './rutas/chatRouter.js';

//instanciamos nueva aplicación express
const app = express();

//necesario para poder recibir datos en json
app.use(express.json());

//las rutas que empiecen por /api/alumnes se dirigirán a alumnesRouter
app.use('/api/chat', chatRouter);

// servimos front como ruta estática
app.use(express.static('front-chat/dist'));

//arranque del servidor
const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))