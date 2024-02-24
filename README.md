Entrega 1:

    -Realizar la parte de front con HTML5 para registrarse.

    -Realizar la parte de front con HTML5 para hacer login en la aplicación.

    -Realizar la parte de front con HTML5 para mostrar datos de la base de datos, 
    según se haya realizado login con alguno de los reoles, o mostrar datos de la 
    base de datos de acceso público si no se ha realizado login.

    Para esta entrega he creado un archivo html que tiene dos formularios,
    uno para iniciar sesión y otro para registrarse. Este archivo tiene su hoja 
    de estilos referenciada para dar estilo a los formularios y a la página html.
    Este archivo html tambien tiene un script referenciado que sirve para recopilar
    los datos del formulario, comunicarse con el backend para hacer una solictud POST
    y recibir la respuesta de si se ha registrado/iniciado sesión o no.

    Para mostrar una página dependiendo del rol que tenga el usuario que inicia sesión
    he hecho lo siguiente:

    Cuando hago login, primero verifico si el usuario puede iniciar sesión, si lo hace 
    correctamente llamo a una ruta que he tenido que crear en el back que se llama 
    userFile, esta ruta llama a un controlador que lo que hace es comprobar que rol 
    tiene el usuario que ha iniciado sesión y devolver el archivo html que le corresponde
    a ese rol.

    He creado tres archivos html con su hoja de estilos y script referenciados, cada uno 
    nombrado con los tres roles que hay. El html muestra una tabla con el contenido 
    que le corresponde al rol y que obtengo del backend a través de las rutas y los 
    controladores.

    Cada script establece comunicación con el backend utilizando la ruta asociada al 
    rol del usuario. Si el usuario posee un rol diferente, el contenido correspondiente
    a ese rol no será visible para él.


Entrega 2:

    Lo primero que he hecho es un nuevo proyecto, he copiado del anterior 
    proyecto los archivos en los que no utilizaba MySQL y la parte del front.

    A partir de ahi, lo que he hecho es instalar el paquete de mongoose con 
    npm. El primer archivo que he cambiado es db.config para poder utilizarlo 
    luego para conectarme a mongo. 

    De la carpeta models he tenido que cambiar todos los archivos ya que en el otro 
    proyecto creaba a través de Sequelize las tablas y las relaciones específicamente 
    para MySql. Por lo que he creado los modelos con mongoose paa poder utilizarlo 
    en mongodb.

    He realizado la conexión con mongodb en el archivo server.js, para realizarla 
    he utilizado las configuraciones que había definido antes en db.config. 

    Después de crear los modelos para mongodb y verificar que puedo establecer la 
    conexión, he tenido que cambiar en los archivos de las carpetas controllers 
    y middleware la manera en que guardo los usuarios o hago las consultas para poder 
    iniciar sesión o registrarse.

        





