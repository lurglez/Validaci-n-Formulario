

let botonEnviar = document.getElementById('enviar'),
    intentos = document.getElementById('intentos'),
    errores = document.getElementById('errores');

let nombre = document.getElementById('nombre'),
    apellidos = document.getElementById('apellidos'),
    edad = document.getElementById('edad'),
    nif = document.getElementById('nif'),
    email = document.getElementById('email'),
    provincia = document.getElementById('provincia'),
    telefono = document.getElementById('telefono'),
    fecha = document.getElementById('fecha'),
    hora = document.getElementById('hora');

let contador = 0;



/*FUNCIÓN PARA COMPROBAR QUE TODO HA SIDO RELLENADO CORRECTAMENTE:
  Cuando se pulsa el botón de envío recorre todos los campos validando su contenido, si no se devuelve true al finalizar,
  el envío del formulario se anula gracias a preventDefault*/
function comprobarEnvio(envio) {
    anadirTexto()
    /* Si todas devuelven true, salta mensaje de confirmación, sino, el formulario nunca llegaría a enviarse */
    if (validarNombreApellidos() && validarEdad() && validarNIF() && validarEmail() && validarProvincia() && validarFecha() && validarTEL()
        && validarHora() && confirm("El formulario está a punto de enviarse, ¿desea continuar?")) {
        return true;
    }
    envio.preventDefault();
    return false
}

/*Creamos el evento y lo asignamos al botón de enviar */
botonEnviar.addEventListener('click', comprobarEnvio, false)

/*blur se activa al perder el foco, llama a la función convertirMayúsculas*/
nombre.addEventListener('blur', convertirMayusculas, false);
apellidos.addEventListener('blur', convertirMayusculas, false);


/* LISTA DE FUNCIONES */

function crearCookie() {
    contador++
    document.cookie = contador;
    return document.cookie
}

/*Función con la que añadimos texto mediante innerHTML dentro de "intentos" informando de los intentos de envío. Para ello llamaremos a la función crearcookie() */
function anadirTexto() {
    let mensaje = "El número de intentos de envío hasta el momento es: " + crearCookie();
    intentos.innerHTML = `<p>${mensaje}</p>`
}

/*-Cada vez que los campos NOMBRE y APELLIDOS pierdan el foco, el contenido que se haya escrito en esos campos se convertirá a mayúsculas.*/
function convertirMayusculas() {
    nombre.value = nombre.value.toUpperCase();
    apellidos.value = apellidos.value.toUpperCase();
}

/*-Función que valida los campos de texto NOMBRE y APELLIDOS. Si se produce algún error muestra el mensaje en el contenedor "errores" 
y pone el foco en los campos correspondientes.*/
function validarNombreApellidos() {
    if (nombre.value == "") {
        errores.innerHTML = `<p>${errorNombre}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        nombre.focus()
        return false
    } else if (apellidos.value == "") {
        errores.innerHTML = `<p>${errorApellidos}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        apellidos.focus()
        return false
    } else {
        /*Si no se produce ningún error, borramos la línes de errores y devolvemos true*/
        errores.innerHTML = "";
        return true;
    }
}

/*FUNCIÓN PARA VALIDAR EDAD: comprueba que el campo no ha sido dejado en blanco y que, a su vez, los valores están entre 0 y 105 */
function validarEdad() {
    /*Convertimos el valor introducido en el formulario a int y lo guardamos en una variable nueva*/
    let comprobarInt = parseInt(edad.value)
    /* Comprobamos que el dato introducio está dentro de los límites establecidos*/
    if (edad.value < 0 || edad.value > 105) {
        errores.innerHTML = `<p>${errorEdad}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        edad.focus()
        return false
        /*Comprobamos que la variable convertida sí es un número con Number.isInteger. Si da error, envía un mensaje */
    } else if (!Number.isInteger(comprobarInt)) {
        errores.innerHTML = `<p>${errorEdad2}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        edad.focus()
        return false
    } else {
        /*Si no se produce ningún error, borramos la línes de errores y devolvemos true*/
        errores.innerHTML = "";
        return true;
    }
}

/*FUNCIÓN QUE VALIDA EL NIF: con la ayuda de una expresión regular comprobamos que el NIF introducido se ajusta a lo establecido*/
function validarNIF() {
    /*El patrón indica que al inicio de una cadena->^ existan 8 números->{8} comprendidos entre 0 y 9->\d 
      a los numeros debe seguirlos un guión bajo y acabar en una letra, tanto mayúscula como minúscula->[A-Z, a-z]$*/
    let patronNIF = /^\d{8}-[A-Z, a-z]$/
    /*Comprobamos que el campo NIF no está vacío y que es correcto. Sino, salta mesanje de error */
    if (!nif.value.match(patronNIF) || nif.value == "") {
        errores.innerHTML = `<p>${errorNIF}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        nif.focus()
        return false
    } else {
        /*Si no se produce ningún error, borramos la línes de errores y devolvemos true*/
        errores.innerHTML = "";
        return true;
    }
}

/*FUNCIÓN VALIDAR EMAIL: creamos una expresión regular que ayudará a comprobar si es un email válido*/
function validarEmail() {
    /*Indicamos que el email debe:
     Comenzar por un número, una barra baja o una letra, sea  mayúscula o minúscula
     Seguir con: uno o más caracteres compuestos por letras, números, barra baja o punto
     Contener un arroba
     Al arroba le siguen una o más letras y/o números, despúes un punto 
     Debe finalizar con mínimo dos y máximo 3 letras*/
    let patron = /^[a-z,A-Z,\d,_]{1}[a-z,A-Z,\d,_,.]+@[a-z, A-Z, \d]+.[a-z, A-Z]{2,3}/
    /*Comprobamos que el campo EMAIL no está vacío y que es correcto. Sino, salta mesanje de error */
    if (!email.value.match(patron) || email.value == "") {
        errores.innerHTML = `<p>${errorEmail}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        email.focus()
        return false
    } else {
        /*Si no se produce ningún error, borramos la línes de errores y devolvemos true*/
        errores.innerHTML = "";
        return true;
    }
}

/*FUNCIÓN QUE VALIDA SELECCIÓN DE PROVINCIA*/
function validarProvincia() {
    /*Comprobamos que se ha seleccionado una provincia, dado que el valor del mensaje por defecto es 0, vemos si el valor obtenido
    es distinto a 0*/
    if (provincia.selectedIndex == 0) {
        errores.innerHTML = `<p>${errorProvincia}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        provincia.focus()
        return false
    } else {
        /*Si no se produce ningún error, borramos la línes de errores y devolvemos true*/
        errores.innerHTML = "";
        return true;
    }
}

/*FUNCIÓN QUE VALIDA LA FECHA: a través de una expresión regular vemos si la fecha sigue ciertas pautas para ser válida*/
function validarFecha() {
    /*Debe comenzar por uno o dos números entre 0 y 9, seguido de un guión, le siguen 1 o dos números entre 0 y 9 y finalmente, otro guión y 4 números entre 0 y 9 */
    let patronFecha = /^\d{1,2}-\d{1,2}-\d{4}$/
    /*Comprobamos que el campo FECHA no está vacío y que es correcto. Sino, salta mesanje de error */
    if (!fecha.value.match(patronFecha) || fecha.value == "") {
        errores.innerHTML = `<p>${errorFecha}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        fecha.focus()
        return false
    } else {
        /*Si no se produce ningún error, borramos la línes de errores y devolvemos true*/
        errores.innerHTML = "";
        return true;
    }
}

/*FUNCIÓN QUE VALIDA EL TELÉFONO*/
function validarTEL() {
    /* Patrón que establece que los datos introducidos deben ser únicamente 9 números de entre 0 y 9 */
    let patronTEL = /^\d{9}$/
    /*Comrpobamos que el teléfono introducido coincide con el patrón prefijado, y/o que no ha sido dejado en blanco */
    if (!telefono.value.match(patronTEL) || telefono.value == "") {
        errores.innerHTML = `<p>${errorTEL}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        telefono.focus()
        return false
    } else {
        /*Si no se produce ningún error, borramos la línes de errores y devolvemos true*/
        errores.innerHTML = "";
        return true;
    }
}

/*-Validar el campo HORA utilizando una expresión regular. Debe seguir el patrón de hh:mm. No es necesario validar que sea una hora correcta.
 Si se produce algún error mostrar el mensaje en el contenedor "errores" y poner el foco en el campo HORA. Explicar las partes de la expresión regular mediante comentarios.*/
/*FUNCIÓN QUE VALIDA LA HORA*/
function validarHora() {
    /* Patrón que establece que la hora sigue un formato adecuado:
       Comenzamos con un número que tendrá de valor 0, 1 o 2
       seguimos con un número entre 0 y 3
       Separemos las horas de los minutos con dos puntos :
       y establecemos que el primer dígito de los minutos tenga un valor mínimo de  0 y máximo de 5
       finalmente, el último dígito está comprendido entre 0 y 9.
       La hora mínima aceptada será 00:00 y la máxima 23:59*/
    let patronHora = /^([0-2]{1}[0-3]{1}):([0-5]{1}\d{1})$/
    /*Comprobamos que el teléfono introducido coincide con el patrón prefijado, y/o que no ha sido dejado en blanco */
    if (!hora.value.match(patronHora) || hora.value == "") {
        errores.innerHTML = `<p>${errorHora}</p>`
        /*Si salta error, ponemos el foco sobre el campo*/
        hora.focus()
        return false
    } else {
        /*Si no se produce ningún error, borramos la línes de errores y devolvemos true*/
        errores.innerHTML = ""; return true;
    }
}

/*LISTA ERRORES POSIBLES*/
let errorNombre = "El campo NOMBRE no puede estar vacío",
    errorApellidos = "El campo APELLIDOS no puede estar vacío",
    errorEdad = "El campo EDAD debe estar comprendido entre 0 y 105 años.",
    errorEdad2 = "El campo EDAD debe contener valores numéricos.",
    errorNIF = "El NIF no es correcto",
    errorEmail = "El email introducido no es válido.",
    errorProvincia = "Debe seleccionar una provincia.",
    errorTEL = "El TELÉFONO no es correcto, introdúzcalo sin espacios ni guiones.",
    errorFecha = "La FECHA no es correcta.<br> Siga el formato: dd-mm-aaaa",
    errorHora = "La hora introducida no sigue un formato correcto: hh:mm.";