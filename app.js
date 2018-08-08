function registrar() { //se reciben las variables de las cajas de texto
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    //imprimo variables para ver si llegan bien
    // alert('email: '+email+'contraseña: '+contrasena);
    // console.log(email);
    // console.log(contrasena);
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            // console.log(errorCode);
            // console.log(errorMessage);
            //alert('Error de código: '+errorCode+"Mensaje de Error: "+errorMessage);

        });

}

function ingresar() { //se reciben las variables de las cajas de texto
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;
    //imprimo variables para ver si llegan bien
    console.log(email2);
    console.log(contrasena2);

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
        .catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // ...
        });
}

// función que valida si un usuario esta en el sistema
function observadordeestado() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Existe usuario activo');
            aparece();
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            console.log(user);
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
            console.log('No existe el usuario');
        }
    });
}

// inicio el observadordeestado() 
observadordeestado() ;

//función que sirve para mostrar un mensaje solo cuando el usuario este activo, es llamada 
//en el observador de estado
function aparece()
{
    var contenido= document.getElementById('contenido');
    contenido.innerHTML='<h1>Bienvenido</h1><br>  <button type="button" class="btn btn-primary" onclick="cerrarSesion()">Cerrar Sesión</button>';
    contenido.style.display="block";
    
}
// función que sirve para quitar el contenido del div de mensajes y ocultarlo
function desaparece()
{
    var contenido= document.getElementById('contenido');
    contenido.innerHTML='';
    contenido.style.display="none";
}

// función que sirve para cerrar la sesión de un usuario activo
function cerrarSesion()
{
    firebase.auth().signOut()
    .then(
        function(){
            console.log('Saliendo...');
            alert('Sesión Cerrada');
            desaparece();
        })
    .catch(function(error)
    {
        console.log(error);
    })
}