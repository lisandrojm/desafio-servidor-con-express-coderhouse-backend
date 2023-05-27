# Servidor con Express - Desafío Entregable - Coderhouse/Backend

Este proyecto es un servidor básico desarrollado con Express que proporciona una API para acceder y gestionar productos. A continuación, se muestra una descripción del código y las instrucciones para ejecutar el proyecto.

## Descripción del código

El código configura un servidor Express que utiliza el módulo `fs` para leer un archivo JSON de productos y proporciona dos rutas:

1. Ruta GET `/products`: Esta ruta devuelve una lista de productos. Puede incluir un parámetro `limit` en la consulta para limitar la cantidad de productos devueltos.

2. Ruta GET `/products/:pid`: Esta ruta devuelve un producto específico según el ID proporcionado en la ruta.

El servidor se inicia en el puerto 8080 y muestra un mensaje en la consola indicando que está en funcionamiento.

## Instrucciones de ejecución

Para ejecutar el servidor, siga los pasos a continuación:

1. Asegúrese de tener Node.js instalado en su máquina.

2. Abra una terminal y navegue hasta el directorio raíz del proyecto.

3. Ejecute el siguiente comando para instalar las dependencias necesarias:

   ```
   npm install
   ```

4. Después de que se completen las instalaciones, ejecute el siguiente comando para iniciar el servidor:

   ```
   npm run dev
   ```

5. El servidor se iniciará y mostrará un mensaje en la consola indicando que está en funcionamiento en el puerto 8080.

6. Puede acceder a la API del servidor utilizando herramientas como Postman o a través del navegador web.

## Documentación de la API

El servidor proporciona las siguientes rutas de la API:

1. Ruta GET `/products`

   - Parámetros de consulta:

     - `limit` (opcional): Permite limitar la cantidad de productos devueltos.

   - Respuesta exitosa: Devuelve una lista de productos en formato JSON.

2. Ruta GET `/products/:pid`

   - Parámetros de ruta:

     - `pid`: ID del producto.

   - Respuesta exitosa: Devuelve el producto correspondiente al ID proporcionado en formato JSON.

   - Respuesta de error (404): Si el producto no existe, se devuelve un mensaje indicando que el producto no existe.

## Dependencias y requisitos

El proyecto utiliza las siguientes dependencias principales:

- Express: Framework de aplicaciones web para Node.js.
- fs: Módulo de Node.js que permite realizar operaciones de lectura y escritura de archivos.

Asegúrese de tener Node.js instalado en su máquina antes de ejecutar el proyecto.
