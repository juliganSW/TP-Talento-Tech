//funcion que se ejecuta al activarse un evento, 
//que en este caso es un click en el botón de agregar
function agregarProducto(event){
    event.preventDefault();
   
    //Se crea el objeto reloj con los atributos
     const reloj ={
       id: parseInt(event.target.getAttribute('data-id')),
       modelo: event.target.getAttribute('data-modelo'),
       precio: parseInt(event.target.getAttribute('data-precio')),
       imagen: event.target.getAttribute('data-imagen')
 };

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
       
        //obtiene el elemento del html con el id "lista-compras",
        //donde se va a mostrar la lista de compras del carrito 
        let listaDeCompras = document.getElementById('lista-carrito');

       //esto limpia si hay una lista anterior , para que no se vea duplicada
        listaDeCompras.innerHTML = ""; 

     //Cuando el carrito está vacío muestro un mensaje
       if (carrito.length === 0) {
        let mensajeCarrito = document.createElement("h2");
        mensajeCarrito.textContent = "No hay productos en el carrito";
        mensajeCarrito.className = 'carrito-vacio';
        //Muestra el mensaje del carrito vacio 
        listaDeCompras.appendChild(mensajeCarrito);
        return; // se pone return para que se corte la función acá,
    }

       //Se va iterando cada producto con un for y se obtiene de a uno 
       //Cuando actualizo tambien puedo mostrar la suma total de la compra,
       //Debo dejar en cero el total antes de entrar al bucle, si quiero hacer la suma
        let totalCarrito = 0;
        for(let i=0; i < carrito.length; i++){
            let reloj = carrito[i];
     
       //Crea un elemento <div> por cada producto agregado 
       let listaItem = document.createElement('table');
       //listaItem.textContent = "El carrito de compras está vacío";
    
listaItem.innerHTML =`
     <tr>
    <td>
      <img src="${reloj.imagen}" alt="Imagen de reloj">
    </td>
    <td>
      <h3>Modelo: ${reloj.modelo}</h3>
      <p>Precio: $${reloj.precio}</p>
    </td>
  </tr>

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
       listaDeCompras.appendChild(listaItem);

       //Acá se van sumando los precios en cada iteracion
       totalCarrito += reloj.precio;
      
       
}
    //importante que esto vaya fuera del bucle
      let listaTotal = document.getElementById('total-carrito');
      //Limpia el contenido previo del contenedor
       listaTotal.innerHTML = "";
   
      let totalItem= document.createElement('h3');
       listaTotal.appendChild(totalItem);
       totalItem.textContent = `Total: $${totalCarrito}`;
      }

function eliminarProducto(relojId){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito= carrito.filter(function(reloj){
        return reloj.id !== relojId
});
localStorage.setItem('carrito', JSON.stringify(carrito));
actualizarCarrito();

}

document.getElementById('vaciar-carrito').addEventListener('click', function(){
    localStorage.removeItem("carrito");
    listaTotal.innerHTML = "";
    actualizarCarrito();
});

// Evento que se ejecuta al cargar completamente la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito(); 
});
    







