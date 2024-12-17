
document.addEventListener("DOMContentLoaded", () => {
   
    
    const botonesAgregar = document.querySelectorAll(".agregar-btn");
    botonesAgregar.forEach(function (boton) {
        boton.addEventListener('click', (event)=>{
            event.preventDefault()
    
    
     //Se crea el objeto reloj con los atributos
     const reloj = {
        id: parseInt(boton.getAttribute('data-id')),
        modelo: boton.getAttribute('data-modelo'),
        precio: parseFloat(boton.getAttribute('data-precio')),
        imagen: boton.getAttribute('data-imagen')
    };
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(reloj);

    //guardar en local storage
    //solo recibe datos en string
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    })
});
actualizarCarrito(); 
});

function actualizarCarrito() {
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
    carrito.forEach(function (reloj) {
        

        //Crea un elemento <div> por cada producto agregado 
        let listaItem = document.createElement('table');

        listaItem.innerHTML = `
        <tr>
            <td>
                <img src="${reloj.imagen}" alt="Imagen de reloj">
            </td>
            <td>
                <h3>Modelo: ${reloj.modelo}</h3>
               <p>Precio: $${reloj.precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </td>
        </tr>`;

        // Crea un botón para eliminar el producto
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar del carrito";
        botonEliminar.className = "product-btn";

        botonEliminar.addEventListener('click', function () {
            eliminarProducto(reloj.id);
        });


        //le paso la llamada a la funcion con el id del producto
        // botonEliminar.onclick = function () {
        //     eliminarProducto(reloj.id);
        // };

        // Se agrega el botón eliminar
        listaItem.appendChild(botonEliminar);

        //Se agrega el nuevo item a la lista de compras del carrito 
        listaDeCompras.appendChild(listaItem);

        //Acá se van sumando los precios en cada iteracion
        totalCarrito += reloj.precio;
    });

    //importante que esto vaya fuera del bucle
    let listaTotal = document.getElementById('total-carrito');
    //Limpia el contenido previo del contenedor
    listaTotal.innerHTML = "";

    let totalItem = document.createElement('h3');
    listaTotal.appendChild(totalItem);
    totalItem.textContent = `Total: $${totalCarrito.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function eliminarProducto(relojId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(function (reloj) {
        return reloj.id !== relojId;
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

document.getElementById('vaciar-carrito').addEventListener('click', function () {
    localStorage.removeItem("carrito");

    // Limpia correctamente el total del carrito
    const listaTotal = document.getElementById('total-carrito');
    listaTotal.innerHTML = "";
    actualizarCarrito();
});



