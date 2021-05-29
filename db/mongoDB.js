import mongoose from 'mongoose';

/* SCHEMAS */

const mensajesSchema = new mongoose.Schema({
  author: {
      type: String,
      require: true,
      max: 100
  },
  text: {
      type: String,
      require: true,
      max: 255
  },
  date: {
    type: String,
    require: true,
    max: 100
  },
});

const productosSchema = new mongoose.Schema({
  title: {
      type: String,
      require: true,
      max: 100
  },
  price: {
      type: Number,
      require: true,
  },
  thumbnail: {
    type: String,
    require: true,
    max: 255
  },
});

/* MODELS */

const DaoMensajes = mongoose.model('mensajes', mensajesSchema);
const DaoProductos = mongoose.model('productos', productosSchema);

/* DB CONNECT */

const URL = 'mongodb://localhost:27017/ecommerce';

export const connectDB = () => {
  try {
    mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Base de datos conectada!')
  } catch (error) {
    console.log('Error al conectar a DB: ', error); 
  }
}

/* MESSAGES FUNCTIONS */

export const findMessages = async  () => {
  try {
    const data = await DaoMensajes.find({});
    return data
  } catch (error) {
    console.log('Error al obtener mensajes: ', error); 
  }
}

export const insertMessage = async (newMessage) => {
  try {
    return await DaoMensajes.create({author: newMessage.author, date: newMessage.date, text: newMessage.text});
  } catch (error) {
    console.log('Error al insertar mensaje: ', error); 
  }
}

/* PRODUCTS FUNCTIONS */

export const findProducts = async  () => {
  try {
    const products =  await DaoProductos.find({})
    return products;
  } catch (error) {
    console.log('Error al obtener productos: ', error); 
  }
}
export const findProduct = async  (id) => {
  try {
    const product =  await DaoProductos.findOne({_id: id})
    return product;
  } catch (error) {
    console.log('Error al obtener productos: ', error); 
  }
}

export const putProduct = async  (updateProduct, id) => {
  try {
    const updateStatus =  await DaoProductos.updateOne({_id: id}, {$set: {title: updateProduct.title, price: updateProduct.price, thumbnail: updateProduct.thumbnail}})
    if (updateStatus?.ok === 1) {
      const product = await DaoProductos.findOne({_id: id});
      return product;
    }
    return null;
  } catch (error) {
    console.log('Error al obtener productos: ', error); 
  }
}

export const removeProduct = async (id) => {
  try {
    const removeStatus =  await DaoProductos.findOneAndRemove({_id: id})
    return removeStatus;
  } catch (error) {
    console.log('Error al obtener productos: ', error); 
  }
}

export const insertProduct = async (newProduct) => {
  try {
    return await DaoProductos.create({title: newProduct.title, price: newProduct.price, thumbnail: newProduct.thumbnail});
  } catch (error) {
    console.log('Error al insertar mensaje: ', error); 
  }
}
