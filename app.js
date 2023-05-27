////////////////////////////////////////////////////////////////////////////////
/* DESAFÍO ENTREGABLE - Servidor con express */

////////////////////////////////////////////////////////////////////////////////

/* Importamos el módulo 'express' y lo asignamos a la variable 'express' */
const express = require('express');

/* Importamos el módulo 'fs' y obtenemos su función 'promises' para realizar
operaciones de lectura y escritura de archivos de forma asíncrona */
const fs = require('fs').promises;

/* Creamos una instancia de la aplicación Express */
const app = express();

/* Definimos el número de puerto en el que se ejecutará el servidor */
const PORT = 8080;

/* Configuramos el middleware de 'urlencoded' para analizar los datos de URL
codificados y los convertimos en un objeto JavaScript accesible en 'req.body' */
app.use(express.urlencoded({ extended: true }));

/* Definimos una ruta GET llamada '/products' en la aplicación Express */
app.get('/products', async (req, res) => {
  try {
    /* Obtenemos el valor del parámetro 'limit' de la consulta (si existe) */
    const limit = req.query.limit;
    /* Leemos el contenido del archivo 'productos.json' de forma asíncrona y
    esperamos a que se complete */
    const productsData = await fs.readFile('productos.json', 'utf8');
    /* Convertimos los datos leídos del archivo JSON en un objeto JavaScript */
    const products = JSON.parse(productsData);
    /* Creamos una variable 'limitedProducts' que almacena los productos 
    limitados según el parámetro 'limit' o todos los productos si no se
    especifica el parámetro */
    const limitedProducts = limit ? products.slice(0, parseInt(limit)) : products;
    /* Enviamos una respuesta JSON al cliente con los productos limitados */
    return res.status(200).json(limitedProducts);
  } catch (error) {
    /* En caso de error, mostramos el mensaje de error en la consola */
    console.error('Error:', error);
    /* Enviamos una respuesta con el código de estado 500 (Error interno del
     servidor) y el mensaje de error correspondiente */
    return res.status(500).send('Internal Server Error');
  }
});

/* Definimos una ruta GET llamada '/products/:pid' en la aplicación Express */
app.get('/products/:pid', async (req, res) => {
  try {
    /* Obtenemos el valor del parámetro de ruta 'pid' */
    const pid = req.params.pid;
    /* Leemos el contenido del archivo 'productos.json' de forma asíncrona y
    esperamos a que se complete */
    const productsData = await fs.readFile('productos.json', 'utf8');
    /* Convertimos los datos leídos del archivo JSON en un objeto JavaScript */
    const products = JSON.parse(productsData);
    /* Buscamos un producto en la lista de productos según el 'id' coincidente */
    const product = products.find((p) => p.id === parseInt(pid));

    if (product) {
      /* Si se encuentra el producto, enviamos una respuesta JSON al cliente con
      el producto correspondiente */
      return res.status(200).json(product);
    } else {
      /* Si no se encuentra el producto, enviamos una respuesta con el código de
      estado 404 (No encontrado) y un mensaje indicando que el producto no existe */
      return res.status(404).send('El producto no existe');
    }
  } catch (error) {
    /* En caso de error, mostramos el mensaje de error en la consola */
    console.error('Error:', error);
    /*  Enviamos una respuesta con el código de estado 500 (Error interno del servidor)
    y el mensaje de error correspondiente */
    return res.status(500).send('Internal Server Error');
  }
});

/* Iniciamos el servidor */
app.listen(PORT, () => {
  /* Mostramos un mensaje en la consola indicando que el servidor se está ejecutando
  en el puerto especificado */
  console.log(`Server is running on port ${PORT}`);
});

////////////////////////////////////////////////////////////////////////////////
/* Comando de ejecución: npm run dev */
