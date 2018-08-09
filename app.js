// función que sirve para registrar un archivo 
function registrar() {
    //se reciben las variables de las cajas de texto
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    //imprimo variables para ver si llegan bien
    // alert('email: '+email+'contraseña: '+contrasena);

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
        .then(function () {
            // si se registro correctamente en firebase
            alert('Usuario registrado correctamente: ' + email)
            verificarCorreo();
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
                alert('El usuario ya existe, por favor inicia sesión \nSi olvidaste tu cotraseña puedes recuperarla');
            } else {
                alert('Mensaje de Error: ' + errorMessage);
            }

        });

}


// función que sirve para ingresar al sistema 
function ingresar() { //se reciben las variables de las cajas de texto
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
        .then(function () { // si el usuario y contraseña estan correctos, entonces
           
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);

        });
}

// función que valida si un usuario esta en el sistema
function observadordeestado() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Existe usuario activo');

            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            console.log(user);
            console.log('*******************');
            console.log(user.emailVerified);
            console.log('*******************');
            // si el correo de usuario esta verificado 
            if (emailVerified) {
                aparece(email);
                leerDatos();
                
            } else {
                alert('Por favor verifica tu correo electrónico\nTe hemos enviado un enlace de activación')
            }
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
            console.log('No existe el usuario');
            //alert('El usuario no esta registrado en el sistema');
        }
    });
}

// inicio el observadordeestado() 
observadordeestado();

//función que sirve para mostrar un mensaje solo cuando el usuario este activo, es llamada 
//en el observador de estado
function aparece(email) {
    var contenido = document.getElementById('contenido');
    var tablaListar = document.getElementById('tablaListar');
    contenido.innerHTML =
        `<h3>Bienvenido (a): ` + email +
        `</h3><br>  <button type="button" class="btn btn-primary" onclick="cerrarSesion()">Cerrar Sesión</button>`;
    contenido.style.display = "block";
    tablaListar.style.display="block";

}
// función que sirve para quitar el contenido del div de mensajes y ocultarlo
function desaparece() {
    var contenido = document.getElementById('contenido');
    var tablaListar = document.getElementById('tablaListar');
    contenido.innerHTML = '';
    contenido.style.display = "none";
    //tablaListar.innerHTML = '';
    tablaListar.style.display = "none";
}

// función que sirve para cerrar la sesión de un usuario activo
function cerrarSesion() {
    firebase.auth().signOut()
        .then(
            function () {
                console.log('Saliendo...');
                alert('Sesión Cerrada Exitosamente');
                desaparece();
            })
        .catch(function (error) {
            console.log(error);
        })
}

// función que sirve enviar un correo a un usuario que se registre por primera vez
function verificarCorreo() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('Se ha enviado un correo de notificación');
        alert('Se ha enviado un correo de verificación de correo');
    }).catch(function (error) {
        // An error happened.
        console.log('Error, no se ha podido enviar un correo de notificación');
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);
    });
}


// función que sirve para borrar un usuario
// function borrarUsuario() {
//     var correoeliminar = document.getElementById('email3').value;


//     var user = correoeliminar;
//     console.log(user);
//     alert('usuario---- ' + user.email);
//     user.delete().then(function () {

//         alert('usuario eliminado')
//     }).catch(function (error) {
//         alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);
//     });
// }

function recuperarContrasena() {

    var auth = firebase.auth();
    var emailAddress = document.getElementById('email3').value;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        alert('hemos enviado una link para restablecer tu contraseña')
    }).catch(function (error) {
        // An error happened. 
        var errorCode = error.code;
        var errorMessage = error.message;
        alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);
    });
}


// CRUD //


// //////////////////// FIRESTORE /////////////////////////

function agregarEstudiante() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = document.getElementById('edad').value;

    // Add a first document with a generated ID.
    db.collection("users").add({
            first: nombre,
            last: apellido,
            born: edad
        })
        .then(function (docRef) {
            alert('Usuario registrado con éxito');
            console.log("Document written with ID: ", docRef.id);
            //limpio cajas de texto
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('edad').value = "";
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);
        });
}

// funcion que sirve para mostrar los datos de una colección
function leerDatos() {
    var tabla = document.getElementById('tabla');
    db.collection("users").onSnapshot((querySnapshot) => {
        tabla.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().first}`);
            //<th scope="row">${doc.id}</th>
            tabla.innerHTML += `
            <tr>
                
                <td>${doc.data().first}</td>
                <td>${doc.data().last}</td>
                <td>${doc.data().born}</td>
                <td><button class="btn btn-success" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            </tr>`;

            // console.log(`${doc.id} => `);
            // console.log(`${doc.id} => `);
            // console.log(`${doc.id} => `);
        });
    });
}
//
//leerDatos();


function editar(id, nombre, apellido, fecha) {

    //alert('dato: ' + id+nombre+apellido,fecha);
    document.getElementById('nombre').value = nombre
    document.getElementById('apellido').value = apellido
    document.getElementById('edad').value = edad
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar registro';
    // si se hace click en el nuevo boton con el nombre actualizar
    boton.onclick = function () {
        var operacion = db.collection('users').doc(id);
        var newNombre = document.getElementById('nombre').value;
        var newApellido = document.getElementById('apellido').value;
        var newFecha = document.getElementById('edad').value;
        return operacion.update({
            first: newNombre,
            last: newApellido,
            born: newFecha
        }).then(function () {
            console.log('Registro actualizado correctamente');
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value = '',
            document.getElementById('apellido').value = '',
            document.getElementById('edad').value = '',
            alert('Registro actualizado correctamente');
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error de codigo:\n ' + errorCode + ' Mensaje de Error:\n ' + errorMessage);
        })
    }
}

// funcion que sirve para eliminar un registro de la coleccion
function eliminar(id) {
    var respuesta = confirm('Esta segguro que desea eliminar el registro' + id);
    if (respuesta) {

        db.collection("users").doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
            alert('Registro eliminado correctamente');
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }
}
