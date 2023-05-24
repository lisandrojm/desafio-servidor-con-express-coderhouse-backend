////////////////////////////////////////////////////////////////////////////////
/* DESAFÍO ENTREGABLE - Servidor con express */

////////////////////////////////////////////////////////////////////////////////
/* Comentarios */
// /* JSDoc */ = jsdoc.app
// /* CMT */ = Comentario

////////////////////////////////////////////////////////////////////////////////

/* JSDoc */
/**
 * Se requiere el módulo 'fs', asignándoselo a la variable fs, lo que permite utilizar
 sus métodos para leer y escribir archivos. 
 * @type {import('fs')}
 * @memberof fs
 */
const fs = require('fs');

/* JSDoc */
/**
 * Clase para gestionar productos.
 */
/* CMT */
/*  Se utiliza la clase ProductManager para leer y escribir datos desde y hacia 
un archivo */
class ProductManager {
  /* JSDoc */
  /**
   * Crea una instancia de ProductManager.
   * @param {string} path - Ruta del archivo de productos.
   */
  /* CMT */
  /*  El constructor acepta el parámetro 'path', que representa la ruta del archivo
  donde se almacenarán los datos de los productos. */
  constructor(path) {
    /* CMT */
    /* 'this.path = path' asigna el valor del parámetro 'path' a la propiedad 'path' de 
    la instancia actual de 'ProductManager'. Esto permite que la instancia tenga acceso
    a la ruta del archivo y la utilice en otros métodos de la clase para leer y escribir
    datos */
    this.path = path;
  }

  /* JSDoc */
  /**
   * Agrega un producto.
   * @param {Object} product - Datos del producto.
   * @property {number} product.id - ID del producto.
   * @property {string} product.title - Título del producto.
   * @property {string} product.description - Descripción del producto.
   * @property {number} product.price - Precio del producto.
   * @property {string} product.thumbnail - URL de la imagen del producto.
   * @property {string} product.code - Código del producto.
   * @property {number} product.stock - Stock del producto.
   */
  /* CMT */
  /* addProduct de la clase ProductManager se encarga de agregar un nuevo producto a la
  lista de productos existentes. */
  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    /* CMT */
    /* Validación para que solo agregue el producto en caso de que todos los campos sean no nulos */
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      const nullField = !title ? 'title' : !description ? 'description' : !price ? 'price' : !thumbnail ? 'thumbnail' : !code ? 'code' : 'stock';
      throw new Error(`Se intentó agregar un producto sin el campo "${nullField}". Todos los campos deben ser no nulos`);
    }
    /* CMT */
    /* Se declara una constante products y se inicializa con el valor devuelto por el método
    getProducts(). Este método se utiliza para obtener la lista actual de productos desde
    el archivo de datos */

    try {
      const products = this.getProducts();
      /* CMT */
      /* Se crea un nuevo objeto newProduct que contiene los datos del producto que se va a 
    agregar.*/
      const newProduct = {
        /* CMT */
        /*  Se asignan los valores de las propiedades title, description, price, thumbnail, code
      y stock del objeto product pasado como argumento del método */
        /* La propiedad 'id' se establece llamando al método 'getNewId', que genera un nuevo
      ID para el producto basado en la lista de productos existentes. */
        id: this.getNewId(products),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
      };
      /* CMT */
      /* El objeto newProduct se agrega a la lista de productos existentes utilizando el método
    'push()' */
      products.push(newProduct);

      /* CMT */
      /* Se llama al método 'saveProducts(products)' para guardar la lista actualizada de productos
    en el archivo de datos  */
      this.saveProducts(products);
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  }
  /* JSDoc */
  /**
   * Obtiene la lista de productos.
   * @returns {Array} - Lista de productos.
   */
  /* CMT */
  /* El método getProducts de la clase ProductManager se encarga de obtener la lista de productos
  desde el archivo de datos*/
  /* try-catch, que se utilizará para manejar posibles errores durante la lectura del archivo. */

  getProducts() {
    try {
      /* JSDoc */
      /**
       * Contenido del archivo de productos.
       * @type {string}
       */
      /* CMT */
      /* Dentro del bloque 'try', se utiliza el método 'readFileSync' del módulo 'fs' para leer de 
      forma síncrona el contenido del archivo ubicado en la ruta 'this.path'.*/
      /* Se especifica la codificación 'utf-8' para asegurar que los datos se interpreten correctamente
      como texto */
      /* El resultado de la lectura del archivo se almacena en la constante 'data' */
      const data = fs.readFileSync(this.path, 'utf-8');
      /* JSDoc */
      /**
       * Lista de productos.
       * @type {Array}
       */
      /* CMT */
      /* Se utiliza 'JSON.parse(data)' para convertir el contenido leído del archivo en un objeto 
      JavasCript.El resultado de esta operación se devuelve como resultado del método  */
      return JSON.parse(data);
      /* CMT */
      /* Si ocurre un error durante la lectura del archivo, se captura el error en el bloque  ' catch'
      En ese caso se devuelve un array vacío ([]) como resultado */
    } catch (error) {
      return [];
    }
  }

  /* JSDoc */
  /**
   * Obtiene un producto por su ID.
   * @param {number} id - ID del producto.
   * @returns {Object|null} - Producto encontrado o null si no se encuentra.
   * @property {number} id - ID del producto.
   * @property {string} title - Título del producto.
   * @property {string} description - Descripción del producto.
   * @property {number} price - Precio del producto.
   * @property {string} thumbnail - URL de la imagen del producto.
   * @property {string} code - Código del producto.
   * @property {number} stock - Stock del producto.
   */
  getProductById(id) {
    /* CMT */
    /* Se obtiene la lista de productos existentes llamando al método getProducts(), que lee la lista de
    productos desde el archivo de datos y la devuelve. */
    try {
      const products = this.getProducts();
      /* CMT */
      /* Se utiliza el método find en la lista de productos para buscar un producto cuya propiedad id sea
    igual al valor del parámetro id pasado al método. */
      /* Si se encuentra un producto con el ID especificado, se devuelve como resultado de la función. */
      /* Si no se encuentra ningún producto con el ID especificado,se devuelve la expresión || null que se utiliza 
    para devolver null como resultado, asegurando que el método siempre devuelva un valor válido. */
      return products.find((product) => product.id === id) || null;
    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }

  /* JSDoc */
  /**
   * Actualiza un producto.
   * @param {number} id - ID del producto a actualizar.
   * @param {Object} updatedFields - Campos actualizados del producto.
   * @throws {Error} - Error si no se encuentra el producto.
   */
  /* CMT */
  /* La función 'updateProduct' recibe un 'id' y los 'updateFields' para actualizar un producto */

  updateProduct(id, updatedFields) {
    /* CMT */
    /* Se obtiene la lista de productos actualizada llamando al método 'getProducts' que lee y devuelve los
    productos desde el archivo */
    try {
      const products = this.getProducts();

      /* CMT */
      /* Se utiliza el método 'findIndex' en la lista de productos para encontrar el índice del producto que 
    tiene el mismo ID proporcionado */
      const index = products.findIndex((product) => product.id === id);

      /* CMT */
      /* Si se encuentra el producto(índice diferente a -1), se procede a actualizar los campos del producto
     con los nuevos valores proporcionados en 'updateFields' utilizando el operador de propagación('...) */
      /* Los prouductos actualizados se guardan llamando al método 'saveProducts', que escribe la lista de 
     productos en el archivo */
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        this.saveProducts(products);

        /* CMT */
        /* Si no se encuentra el producto (índice igual a -1), se lanza un error indicando que el producto con
      el ID especificado no fue encontrado. */
      } else {
        throw new Error(`Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  /* JSDoc */
  /**
   * Elimina un producto.
   * @param {number} id - ID del producto a eliminar.
   * @throws {Error} - Error si no se encuentra el producto.
   */

  deleteProduct(id) {
    /* CMT */
    /* Se obtiene la lista de productos actualizada llamando al método 'getProducts' que lee y devuelve los
     productos desde el archivo */
    try {
      /* CMT */
      /* Se utiliza el método 'findIndex' en la lista de productos para encontrar el índice del producto que
    tiene el mismo ID proporcionado */
      const products = this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        /* CMT */
        /* Si se encuentra el producto (índice diferente a -1), se utiliza el método 'splice' para eliminar
      el producto de la lista de productos, eliminando 1 elemento en la posición del índice encontrado */
        products.splice(index, 1);
        this.saveProducts(products);

        /* CMT */
        /* Si no se encuentra el producto (índice igual a -1), se lanza un error indicando que el producto con
      el ID especificado no fue encontrado. */
      } else {
        throw new Error(`Producto con id ${id} no encontrado.`);
      }
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }

  /* JSDoc */
  /**
   * Obtiene un nuevo ID para un producto.
   * @param {Array} products - Lista de productos.
   * @returns {number} - Nuevo ID.
   */

  /* CMT */
  /*La función 'getNewId(products)' recibe una lista de productos y devuelve un nuevo ID para un producto.
  Luego, se le suma 1 para obtener un nuevo ID único. Si la lista de productos está vacía, devuelve 1 como ID inicial.  */
  getNewId(products) {
    /* JSDoc */
    /**
     * Lista de IDs de productos existentes.
     * @type {Array}
     */
    /* CMT */
    /* Verifica si la lista de productos no está vacía */
    try {
      const productIds = products.map((product) => product.id);

      /* JSDoc */
      /**
       * Nuevo ID generado para el producto.
       * @type {number}
       */
      /* CMT */
      /* Si no está vacía, utiliza el método Math.max(...products.map((product) => product.id)) para obtener el ID más alto de la lista de productos. */
      /* Luego, se le suma 1 para obtener un nuevo ID único. Si la lista de productos está vacía, devuelve 1 como ID inicial.   */
      return productIds.length > 0 ? Math.max(...productIds) + 1 : 1;
    } catch (error) {
      throw new Error(`Error al generar el nuevo ID: ${error.message}`);
    }
  }

  /* JSDoc */
  /**
   * Guarda la lista de productos en el archivo.
   * @param {Array} products - Lista de productos a guardar.
   */
  /* CMT */
  /*La función 'saveProducts(products)'recibe una lista de productos y guarda los productos en un archivo. 
  Utiliza el método fs.writeFileSync para escribir la lista de productos en el archivo especificado por this.path. Los productos se guardan en formato JSON con una estructura legible y tabulada. */

  saveProducts(products) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      throw new Error(`Error al guardar los productos: ${error.message}`);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
/*Agregado de productos al archivo productos.json para el desafío - Servidor con express */

/* Se crea la instancia de la clase “ProductManager” */
const productManager = new ProductManager('productos.json');

/* Se agregan los productos para el Desafío Entregable "Servidor con express" */
productManager.addProduct({
  title: 'Producto express 1',
  description: 'Este es un producto para express',
  price: 100,
  thumbnail: 'Sin imagen',
  code: 'a1',
  stock: 10,
});

/* Productos agregados para express */
productManager.addProduct({
  title: 'Producto express 2',
  description: 'Este es un producto para express',
  price: 200,
  thumbnail: 'Sin imagen',
  code: 'b2',
  stock: 20,
});

productManager.addProduct({
  title: 'Producto express 3',
  description: 'Este es un producto para express',
  price: 300,
  thumbnail: 'Sin imagen',
  code: 'c3',
  stock: 30,
});

productManager.addProduct({
  title: 'Producto express 4',
  description: 'Este es un producto para express',
  price: 400,
  thumbnail: 'Sin imagen',
  code: 'd4',
  stock: 40,
});
productManager.addProduct({
  title: 'Producto express 5',
  description: 'Este es un producto para express',
  price: 500,
  thumbnail: 'Sin imagen',
  code: 'c5',
  stock: 50,
});
productManager.addProduct({
  title: 'Producto express 6',
  description: 'Este es un producto para express',
  price: 600,
  thumbnail: 'Sin imagen',
  code: 'd6',
  stock: 60,
});
productManager.addProduct({
  title: 'Producto express 7',
  description: 'Este es un producto para express',
  price: 700,
  thumbnail: 'Sin imagen',
  code: 'e7',
  stock: 70,
});
productManager.addProduct({
  title: 'Producto express 8',
  description: 'Este es un producto para express',
  price: 800,
  thumbnail: 'Sin imagen',
  code: 'f8',
  stock: 80,
});
productManager.addProduct({
  title: 'Producto express 9',
  description: 'Este es un producto para express',
  price: 900,
  thumbnail: 'Sin imagen',
  code: 'g9',
  stock: 90,
});
productManager.addProduct({
  title: 'Producto express 10',
  description: 'Este es un producto para express',
  price: 1000,
  thumbnail: 'Sin imagen',
  code: 'h10',
  stock: 100,
});

console.log(productManager.getProducts());
console.log('↑ /* Productos agregados para el "Servidor con express" */');
