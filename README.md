Gestión del estado

    Componente publicPage:

        En este componente inicilizo un estado con un array vacío que se llenará con los datos que obtenga del servidor. 

        Utilizo el hook UseEffect para hacer la solicitud al servidor cuando el componente se renderiza, si la solicitud es exitosa actualizo el estado con los datos que he recibido.

        Los datos que tengo en el estado los utilizo para enseñarlos en una tabla.

    Componente logInSignUp:

        En la parte de registrarse inicializo un estado con los datos que necesito para crear un usuario, tambien creo un estado para manejar la respuesta que reciba del servidor que se mostrará en el componente. Utilizo un evento de cambio para actualizar el estado según los cambios en los campos de los formularios. Cuando pulso el botón de registrar este hace una petición para crear un usuario con los datos del estado. Si la petición da error actualizo el estado de respuesta para mostrarlo por pantalla. Después de realizar la petición reseteo los datos del estado que se necesita para registrarse. 

        En la parte de iniciar sesión inicializo un estado con los datos que necesito para iniciar sesión, tambien creo un estado para mostrar los errores que va a devolver si se ha hecho incorrecto. Uso un evento de cambio para actualizar el estado según los cambios en los campos de los formularios. Al pulsar el botón de iniciar sesión se hace una petición al servidor con los datos del estado, si esta es fallida se actualiza el estado de error de inicio de sesión para que se muestre en la pantalla. Después de realizar la petición reseteo el estado de los datos del formulario de inicio de sesión.

    Componentes admin, moderator y user:

        En estos componentes inicializo el estado con la función que lo actualiza, lo inicializo con un array vacío debido que a lo que van a recibir es un array de JSON.

        En estos componentes uso el hook UseEffect para hacer la solicitud al servidor al renderizar el componente, si la solicitud es exitosa actualizo el estado local que contiene los datos que va a mostrar.

        Los datos que tengo en el estado los enseño en una tabla
    

Gestión de rutas

    El proyecto tiene 6 rutas:

        -/ -> Esta ruta renderiza el componente que recibe el contenido publico de la api. A través de esta ruta puedes acceder a la ruta de /logInSignUp. 
        -logInSignUp -> En esta ruta se encuentra el componente para registrar usuarios e iniciar sesión. Al iniciar sesión este te redirige dependiendo del rol que tengas a la ruta que le corresponde.
        -/admin -> Aquí esta el componente que muestra la información que solo se puede ver el admin, si se intenta acceder y no tienes los permisos o no tienes token te dirigira a la ruta /error.
        -/moderator -> Aquí esta el componente que muestra la información que puede ver el moderator, al igual que con el admin si no se tiene permiso o token te dirige a /error.
        -/user -> Esta ruta contiene el componente que muestra la información que ven los user, si no tienes token te dirige a /error.
        -/error

    Para manejarme entre rutas utlizo el hook useNavigate de react-router-dom.
        
