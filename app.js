function registrar()
{
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    // alert('email: '+email+'contraseña: '+contrasena);
    // console.log(email);
    // console.log(contrasena);
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        //alert('Error de código: '+errorCode+"Mensaje de Error: "+errorMessage);

      });

}