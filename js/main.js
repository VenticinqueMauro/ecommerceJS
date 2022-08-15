const productos = [
    {
        id: 1,
        marca: "vizzano",
        categoria: "stilettos",
        precio: 9790,
        color:"negro",
        numero:34,
        cantidad:1,
        img: "img/img.png" 
    },
    {
        id: 2,
        marca: "varietta",
        categoria: "botas",
        precio: 14590,
        color:"blancas",
        numero:36,
        cantidad:1,
        img: "img/img.png" 
    },
    {
        id: 3,
        marca: "vizzano",
        categoria: "botas",
        precio: 12390,
        color:"negro",
        numero:38,
        cantidad:1,
        img: "img/img.png" 
    },
    {
        id: 4,
        marca: "vizzano",
        categoria: "sandalias",
        precio: 7480,
        color:"animal print",
        numero:36,
        cantidad:1,
        img: "img/img.png"
    },

    {
        id: 5,
        marca: "varietta",
        categoria: "stilettos",
        precio: 11290,
        color:"fucsia",
        numero:39,
        cantidad:1,
        img: "img/img.png" 
    },
    {
        id: 6,
        marca: "moleca",
        categoria: "botas",
        precio: 9990,
        color:"violeta",
        numero:36,
        cantidad:1,
        img: "img/img.png"
    },
    {
        id: 7,
        marca: "moleca",
        categoria: "sandalias",
        precio: 6490,
        color:"rosa",
        numero:37,
        cantidad:1,
        img: "img/img.png"
    },
    {
        id: 8,
        marca: "actvitta",
        categoria: "chatas",
        precio: 4490,
        color:"azul",
        numero:40,
        cantidad:1,
        img: "img/img.png"
    },
    {
        id: 9,
        marca: "actvitta",
        categoria: "chatas",
        precio: 4490,
        color:"azul",
        numero:37,
        cantidad:1,
        img: "img/img.png"
    },
    {
        id: 10,
        marca: "actvitta",
        categoria: "chatas",
        precio: 4490,
        color:"verde",
        numero:37,
        cantidad:1,
        img: "img/img.png" 
    },
    {
        id: 11,
        marca: "vizzano",
        categoria: "botas",
        precio: 12390,
        color:"negro",
        numero:37,
        cantidad:1,
        img: "img/img.png" 
    },
    {
        id: 12,
        marca: "actvitta",
        categoria: "chatas",
        precio: 4490,
        color:"azul",
        numero:39,
        cantidad:1,
        img: "img/img.png" 
    },
]

class Productos {
    constructor(id, marca, categoria, precio, color, numero, cantidad, img){
        this.id = id,
        this.marca = marca,
        this.categoria = categoria, 
        this.precio = precio, 
        this.color = color,
        this.numero = numero,
        this.cantidad = cantidad,
        this.img = img
    }
}

// FUNCION PARA AGREGAR NUEVOS PRODUCTOS AL ARRAY DE PRODUCTOS MEDIANTE LA INSTANCIACION DE UN OBJETO

function agregarAlStock(nombreProducto){
    productos.push(nombreProducto)
}

// FUNCION PARA SELECCIONAR POR ID ELEMENTOS DEL DOM

function selectID(id){
    return document.getElementById(id);
}

const contenedor = selectID('contenedor-productos')
const contenedorCarrito = selectID('contenedorCarrito')
const contenedorModal = selectID('contenedorModal')
const vaciarCarrito = selectID('vaciarCarrito')
const cantidadProductosCarrito = selectID('cantidadProductos')
const totalAPagar = selectID('totalPagar')


// ARRAY DE PRODUCTOS EN CARRITO 

let carrito = []

// RECORRO Y RENDERIZO ARRAY DE PRODUCTOS

productos.forEach((x) => {

    const div = document.createElement('div')
    div.classList.add('col-md-3')
    div.innerHTML = `
            <div class="card mt-4 p-1" style="width: 18rem;">
                <img src="${x.img}" class="card-img-top mx-auto d-block" alt="${x.categoria}" widht="284" heigth="284">
                <div class="card-body">
                    <h5 class="card-title">${x.categoria}-${x.marca}</h5>
                    <h5>N${x.numero}-${x.color}</h5>
                    <p class="card-text h3">$${x.precio}</p>
                    <a id="btnAgregar${x.id}" href="#" class="btn btn-primary" ">Añadir al Carro</a>
                </div>
            </div>
        `;

    contenedor.prepend(div);

    const btnCarrito = selectID(`btnAgregar${x.id}`)
    btnCarrito.addEventListener('click', () => {
        agregarAlCarrito(x.id)
    } )
} )

// AGREGO PRODUCTOS AL CARRITO, EN CASO DE REPETIR ITEM LOS SUMO AL IGUAL QUE SU PRECIO.

function agregarAlCarrito(id){
    const repetido = carrito.some((x) => x.id === id)
    if (repetido){
        const x = carrito.map (x => {
            if (x.id === id){
                x.cantidad++
                x.precio+= x.precio
            }
        })
    } else {
    const item = productos.find((x) => x.id === id);
    carrito.push(item);
    }
    actualizarCarrito()
}

// ACTUALIZO Y RENDERIZO CARRITO EN MODAL. ALMACENO DATOS EN LA LOCALSTORAGE

function actualizarCarrito(){
    contenedorModal.innerHTML = "";
    carrito.forEach((x) => {
        let html = document.createElement('div')
        html.classList.add('row')
        html.innerHTML = `
            <div class="col-md-3">
                <img src="img/img.png" alt="" width="60">
            </div>
            <div class="col-md-3">
                <p>Cantidad: ${x.cantidad} </p>
            </div>
            <div class="col-md-3">
                Precio: ${x.precio}
            </div>
            <div class="col-md-3">
                <button class="border-0 bg-transparent" onclick="eliminarProducto(${x.id})"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `
        contenedorModal.prepend(html)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    cantidadProductosCarrito.innerText = carrito.reduce((acc, x) => acc + x.cantidad, 0)
    totalAPagar.innerText = carrito.reduce((acc, x) => acc + x.precio, 0)
}

// ELIMINAR INDIVIDUALMENTE CADA PRODUCTO DEL CARRITO 

function eliminarProducto(id){
    const item = carrito.find(x => x.id === id);
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1);
    localStorage.removeItem('carrito')
    actualizarCarrito();
}

// ELIMINA LA TOTALIDAD DEL CARRITO

vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0;
    localStorage.removeItem('carrito')
    actualizarCarrito()
})

// OBTIENE LOS DATOS DE LOCALSTORAGE

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})





