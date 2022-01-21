# Desafío 12 - Programación Backend

### CoderHouse

## LOG-IN POR FORMULARIO

Incorporaremos un mecanismo sencillo que permite loguear un cliente por su nombre mediante un formulario de ingreso.

### Consigna

Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permite loguear un cliente por su nombre, mediante un formulario de ingreso.

Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.

Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.

Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.

#### Detalles del entregable:

La solución entregada deberá persistir las sesiones de usuario en Mongo Atlas.

- Verificar que en los reinicios del servidor, no se pierdan las sesiones activas de los clientes.

- Mediante el cliente web de Mongo Atlas, revisar los id de sesión correspondientes a cada cliente y sus datos.

- Borrar una sesión de cliente en la base y comprobar que en el próximo request al usuario se le presente la vista de login.

- Fijar un tiempo de expiración de sesión de 1 minuto recargable con cada visita del cliente al sitio y verificar que si pasa ese tiempo de inactividad el cliente quede deslogueado.

### Ejecución

Luego de clonar o descargar el repositorio e instalar todas las dependencias con `npm install`, existen dos comandos para levantar el proyecto.
Para levantarlo en modo de desarrollo junto a nodemon, utilizar `npm run dev`. De lo contrario, para ejecutarlo en "modo producción", utilizar `npm start`.

Se puede seleccionar entre dos métodos de persistencia de **datos y sesiones** a través de la variable de entorno `PERS`. El modo `PERS=mongodb_atlas` **(DEFECTO)** para persistir en **MongoDB Atlas** y el modo `PERS=mongodb` para hacer lo mismo en **MongoDB local**

### Vistas

Existen las siguientes vistas que proveen una manera amena de probar el desafío.
Estas vistas se encuentran en las rutas:

- **/** : es la vista principal en donde se encuentra el formulario de carga de productos y el centro de mensajes (chat). Utiliza **websockets**. Requiere autenticación.

- **/productos-mock** : es donde se muestra en una tabla el mock de productos devueltos por la llamada a la API en la ruta de test. Requiere autenticación

- **/login** : pequeño formulario de login.

- **/logout** : vista a la que se accede tras hacer el logout y luego de 5 segundos redirige a home.

### API

Consiste en las siguientes rutas:

#### Router /api/productos

| Método | Endpoint                | Descripción                                                        |
| ------ | ----------------------- | ------------------------------------------------------------------ |
| GET    | **/api/productos/**     | Me permite listar todos los productos disponibles                  |
| POST   | **/api/productos/**     | Para incorporar productos al listado                               |
| GET    | **/api/productos/:id**  | Me permite listar un producto por su id                            |
| PUT    | **/api/productos/:id**  | Actualiza un producto por su id. Admite actualizaciones parciales  |
| DELETE | **/api/productos/:id**  | Borra un producto por su id                                        |
| GET    | **/api/productos-test** | Devuelve un listado de 5 productos mock generados con **Faker.js** |

### Deploy en Heroku (Temporal):

https://des12-prellezose.herokuapp.com/
