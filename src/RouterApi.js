import express from 'express';
import { insertProduct, findProducts, findProduct, putProduct, removeProduct } from '../db/mongoDB.js';


const routerApi = express.Router();
routerApi.use(express.json())
routerApi.use(express.urlencoded({extended: true}));

routerApi.get('/productos', async (req, res) => {
  const data = await findProducts();
  if (!data.length) {
    res.json({error: 'no hay productos cargados'})
  }
  res.json(data);
})

routerApi.post('/productos', async (req, res) => {
  const data = req.body;
  data.price = parseFloat(data.price);
  const newProduct = await insertProduct({
    title: data.title,
    price: data.price,
    thumbnail: data.thumbnail,
  })
  res.json(newProduct);
})

routerApi.get('/productos/:id', async (req, res) => {
  const filterProduct = await findProduct(req.params.id);
  if (!filterProduct) res.json({error: 'producto no encontrado'})
  res.json(filterProduct);
})


routerApi.put('/productos/:id', async (req, res) => {
  const data = req.body;
  data.price = parseFloat(data.price);
  const updateProduct = await putProduct({
    title: data.title,
    price: data.price,
    thumbnail: data.thumbnail,
  }, req.params.id);
  if (!updateProduct) res.json({error: 'producto no encontrado'})
  res.json(updateProduct);
})

routerApi.delete('/productos/:id', async (req, res) => {
  const deleteProduct = await removeProduct(req.params.id);
  if (!deleteProduct) res.json({error: 'producto no encontrado'})
  res.json(deleteProduct);
})

export { routerApi };