const boton = document.getElementById("chuck-btn")
const frase = document.getElementById("chuck-quote")

boton.addEventListener("click", getData);

//Funcion asincrónica para consumir la api 

async function getData(){
    try{
    const data = await fetch( "https://api.chucknorris.io/jokes/random");
    const datos = await data.json();
    console.log(datos);
   
    frase.textContent = datos.value
}
catch(err){
    console.error(err);
}
}