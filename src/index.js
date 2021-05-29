import express from 'express';
import { routerApi } from './RouterApi.js';
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { connectDB, findMessages, insertMessage, findProducts, insertProduct } from '../db/mongoDB.js';

const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

/* CONEXION A DB MONGO */
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use('/api', routerApi);

app.use('/', express.static('public'))

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!')

  socket.emit('productos', await findProducts());

  socket.emit('messages', await findMessages())

  socket.on('new-product', async product => {
    await insertProduct(product);
    socket.emit('productos', await findProducts());
  })

  socket.on('new-message', async data => {
      await insertMessage(data)
      socket.emit('messages', await findMessages())
  })
})

app.get('/', async (req, res) => {
  const data = await findProducts()
  res.render("pages/products", {
    products: data
  })
})

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
  console.log(`servidor inicializado en ${server.address().port}`)
})

server.on("error", error => console.log(`error en el servidor: ${error.message}`))