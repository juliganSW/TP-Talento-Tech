//import {relojes } from './catalogo.js'; 


//funcion que se ejecuta al activarse un evento, 
//que en este caso es un click en el botón de agregar

function agregarProducto(event){
    event.preventDefault();
   
    //Se crea el objeto reloj con los atributos
//     const relojes ={
//        id: parseInt(event.target.getAttribute('data-id')),
//        modelo: event.target.getAttribute('data-modelo'),
//        precio: parseInt(event.target.getAttribute('data-precio')),
//        imagen: event.target.getAttribute('data-imagen')
// };
const relojes = [
    {
        id: 1,
        modelo: "Canyon Trail",
        precio: 179995,
        imagen: "../assets/img/reloj_hombre1.png"
    },
    {
        id: 2,
        modelo: "Minimal Blue",
        precio: 179000,
        imagen: "../assets/img/reloj_hombre2.png"
    },
    {
        id: 3,
        modelo: "Midnight Explorer",
        precio: 159995,
        imagen: "../assets/img/reloj_hombre3.png"
    },
    {
        id: 4,
        modelo: "Timeless Tech",
        precio: 169995,
        imagen: "../assets/img/reloj_hombre4.png"
    },
    {
        id: 5,
        modelo: "Daily Driver",
        precio: 169995,
        imagen: "../assets/img/reloj_hombre5.png"
    },
    {
        id: 6,
        modelo: "Adventure Matic",
        precio: 189995,
        imagen: "../assets/img/reloj_hombre6.png"
    },
    {
        id: 7,
        modelo: "Forest Ranger",
        precio: 159995,
        imagen: "../assets/img/reloj_hombre7.png"
    },
    {
        id: 8,
        modelo: "Mechanic MD40",
        precio: 169800,
        imagen: "../assets/img/reloj_hombre8.png"
    },

    ];
 
// Obtiene el id del producto desde el botón
   const relojId = parseInt(event.target.getAttribute('data-id'));
   //busco el reloj en el catalogo de relojes
   const reloj = relojes.find((item) => item.id === relojId);
  

    
    let carrito = JSON.parse(localStorage.getItem('carrito')) ||[];
    carrito.push(reloj);
    //guardar en local storage
    //solo recibe datos en string
     localStorage.setItem('carrito', JSON.stringify(carrito));
     actualizarCarrito();
}

function actualizarCarrito(){
    //Asi obtengo el carrito guardado en local storage convirtiendolo en un array 
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
       
        //obtiene el elemento del html con el id "lista -compras", que es un ul
        //donde se va a mostrar la lista de compras del carrito 
        let listaDeCompras = document.getElementById('lista-carrito');
        //esto limpia si hay una lista anterior , para que no se vea duplicada
        listaDeCompras.innerHTML = ""; // Limpia la lista de forma más eficiente
       //Se va iterando cada producto con un for y se obtiene de a uno 
        for(let i=0; i < carrito.length; i++){
            let reloj = carrito[i];
     
       //Crea un elemento <div> por cada producto agregado 
       let listaItem = document.createElement('div');
       //Se le agrega contenido de texto a cada elemento nuevo
       //listaItem.textContent ="Modelo: " + reloj.modelo + " "+ "$ "+ reloj.precio;
       listaItem.innerHTML = `
       <img src="${reloj.imagen}">
       <h3>Modelo: ${reloj.modelo}</h3>
       <p>Precio: $${reloj.precio}</p>
       
       `;
         // Crea un botón para eliminar el producto
         let botonEliminar = document.createElement('button');
         botonEliminar.textContent = "Eliminar del carrito";
         
         botonEliminar.className = "product-btn";
         

         //le paso la llamada a la funcion con el id del producto
         botonEliminar.onclick = function () {
             eliminarProducto(reloj.id); 
         };
        
 
         // Se agrega el botón eliminar
         listaItem.appendChild(botonEliminar);
 
       //Se agrega el nuevo item a la lista de compras del carrito 
       listaDeCompras.appendChild(listaItem)
       
}
    }

function eliminarProducto(relojId){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito= carrito.filter(function(reloj){
        return reloj.id !== relojId
});
localStorage.setItem('carrito', JSON.stringify(carrito));
actualizarCarrito();






}

// Evento que se ejecuta al cargar completamente la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito(); // Llama a la función para mostrar los productos almacenados
});
    







