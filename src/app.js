////////////////////////////////////////////////////////////////////////////////
/* DESAFÍO ENTREGABLE - Servidor con express */

////////////////////////////////////////////////////////////////////////////////

/* Importamos los módulos express y fs (file system) de Node.js. El módulo express
nos permite crear y configurar el servidor, mientras que el módulo fs nos proporciona
métodos para trabajar con archivos. */
const express = require('express');

/* El uso de const fs = require('fs').promises; nos permite acceder a las funciones
del módulo fs de Node.js utilizando promesas en lugar de devoluciones de llamada 
(callbacks). */
const fs = require('fs').promises;

/* Creamos una instancia de la aplicación Express y establecemos el número de puerto
en el que el servidor escuchará las solicitudes entrantes. */
const app = express();
const PORT = 8080;

/* configura el middleware express.urlencoded() para analizar los datos enviados en una
solicitud con el tipo de contenido application/x-www-form-urlencoded, permitiendo que los
valores de los datos puedan ser objetos o matrices. */
app.use(express.urlencoded({ extended: true }));

/* Definimos una ruta /products para manejar las solicitudes GET. Cuando se accede a
esta ruta, leemos el archivo productos.json, analizamos su contenido en un objeto
JavaScript y luego respondemos con todos los productos o con un número limitado de
productos según el valor del parámetro de consulta limit en la URL. */
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const productsData = await fs.readFile('productos.json', 'utf8');
    const products = JSON.parse(productsData);

    const limitedProducts = limit ? products.slice(0, parseInt(limit)) : products;
    res.json(limitedProducts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

/* Definimos una ruta /products/:pid para manejar las solicitudes GET con un parámetro
de ruta pid. Cuando se accede a esta ruta, leemos el archivo productos.json,
analizamos su contenido en un objeto JavaScript y luego buscamos el producto que
coincide con el ID proporcionado en el parámetro de ruta. Respondemos con el
producto encontrado si existe, o enviamos un código de estado 404 si no se encuentra el producto. */
app.get('/products/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const productsData = await fs.readFile('productos.json', 'utf8');
    const products = JSON.parse(productsData);
    const product = products.find((p) => p.id === parseInt(pid));

    if (product) {
      res.json(product);
    } else {
      res.status(404).send('El producto no existe');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

/* Iniciamos el servidor y lo hacemos escuchar en el puerto especificado. Imprimimos
un mensaje en la consola indicando que el servidor se está ejecutando en ese puerto. */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

////////////////////////////////////////////////////////////////////////////////
/* comando de ejecución: npx nodemon app.js */
