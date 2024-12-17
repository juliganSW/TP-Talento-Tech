const miFormulario = document.getElementById("form");
const botonEnviar = document.getElementById('btn-enviar');

botonEnviar.addEventListener('click', validarFormulario);

//Funcion para validar el formulario
function validarFormulario(event){
event.preventDefault();

//obtengo los valores de los inputs del formulario y los guardo en las variables
let nombre = document.getElementById("nombre").value.trim();
let apellido = document.getElementById("apellido").value.trim();
let email = document.getElementById("email").value.trim();
let descripcion = document.getElementById("descripcion").value.trim();


//Si falta llenar algun campo, escribo un mensaje en el documento
const mensajeNombre = document.getElementById("mensajeNombre");
const mensajeApellido = document.getElementById("mensajeApellido");
const mensajeEmail = document.getElementById("mensajeEmail");



//Verificar que los campos no queden vacíos
if(
   nombre === ""||
   apellido === ""||
   email === "" ||
   descripcion == ""
    ){   
     alert("Todos los campos son obligatorios")
     return false
}

//Se verifica que los campos nombre, apellido, email, sólo tengan caracteres válidos
//Se hace utilizando una expresiones regulares
let expRegAlfabetica = /^[a-zA-ZÀ-ÿ\s]+$/;
let expRegMail =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Variable que me indica si el formulario es válido
let esValido = true;

if(!nombre.match (expRegAlfabetica)){
   marcarError(mensajeNombre, " ❌ Sólo caracteres alfabéticos")
   esValido = false;
}else{
    marcarValido(mensajeNombre, "✅");
}

//Se verifica que el campo apellido sólo permita caracteres alfabeticos
//Se hace utilizando una expresion regular 
if(!apellido.match(expRegAlfabetica)){
    marcarError(mensajeApellido, " ❌ Sólo caracteres alfabéticos")
    esValido = false;
}else{
    marcarValido(mensajeApellido, "✅");
}

//Se verifica que el formato para el mail sea válido; se usa una expresion regular
if(!email.match(expRegMail)){
    marcarError(mensajeEmail," ❌ El formato no es válido")
    esValido = false;
}else{
    marcarValido(mensajeEmail, "✅")
}

//Verifico que el mensaje tenga un minimo de contenido, usando la propiedad length
//con trim() se ignoran los espacios en blanco al principio y al fin 
if(descripcion.trim().length < 10){
    marcarError(mensajeDescripcion, " ❌ El mensaje debe tener al menos 10 caracteres")
    esValido = false;
}else{
    marcarValido(mensajeDescripcion, "✅")
}

//Cuando las validaciones se dan con exito, se procede a enviar el formulario 
if(esValido){
 alert("Formulario enviado con éxito 👍");
 //let miFormulario = document.getElementById("form"); 
 miFormulario.submit();
 miFormulario.reset();
 }

}

//Funciones que puedo poner aquí, ya que estas funciones son hoisted
//Funcion para marcar un campo erróneo 
function marcarError (etiqueta, mensaje){
    etiqueta.textContent = mensaje;
    etiqueta.style.color ="red"
}

function marcarValido(etiqueta,mensaje){
    etiqueta.textContent = mensaje;
    etiqueta.style.color ="green";
}


