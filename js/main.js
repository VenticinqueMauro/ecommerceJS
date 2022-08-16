const productos = [
    {
        id: 1,
        marca: "vizzano",
        categoria: "botas",
        precio: 11790,
        color:"marron",
        numero:34,
        cantidad:1,
        img: "img/botasvizMarron.jpg" 
    },
    {
        id: 2,
        marca: "ramarin",
        categoria: "sandalias",
        precio: 8590,
        color:"jean",
        numero:36,
        cantidad:1,
        img: "img/sandaliasRamarinJean.jpg" 
    },
    {
        id: 3,
        marca: "ene",
        categoria: "botas",
        precio: 12390,
        color:"gris",
        numero:38,
        cantidad:1,
        img: "img/enereptilgris.jpg" 
    },
    {
        id: 4,
        marca: "vizzano",
        categoria: "sandalias",
        precio: 7480,
        color:"roja",
        numero:36,
        cantidad:1,
        img: "img/sandaliasVizRoja.jpg"
    },

    {
        id: 5,
        marca: "varietta",
        categoria: "stilettos",
        precio: 11290,
        color:"turquesa",
        numero:39,
        cantidad:1,
        img: "img/stilettosVarTur.jpg" 
    },
    {
        id: 6,
        marca: "viuno",
        categoria: "sandalias",
        precio: 9990,
        color:"amarillo",
        numero:36,
        cantidad:1,
        img: "img/viaUnoTachoChinoAmarillo.jpg"
    },
    {
        id: 7,
        marca: "varietta",
        categoria: "sandalias",
        precio: 6490,
        color:"animal print",
        numero:37,
        cantidad:1,
        img: "img/sandaliasVarRojacnpelo.jpg"
    },
    {
        id: 8,
        marca: "beira rio",
        categoria: "sandalias",
        precio: 4490,
        color:"negro",
        numero:40,
        cantidad:1,
        img: "img/beiraTachoChino.jpg"
    },
    {
        id: 9,
        marca: "varietta",
        categoria: "stilettos",
        precio: 4490,
        color:"amarillo",
        numero:37,
        cantidad:1,
        img: "img/variettaamar.jpg"
    },
    {
        id: 10,
        marca: "varietta",
        categoria: "stilettos",
        precio: 4490,
        color:"animal print",
        numero:37,
        cantidad:1,
        img: "img/variettaanimalb.jpg" 
    },
    {
        id: 11,
        marca: "varietta",
        categoria: "stilettos",
        precio: 12390,
        color:"fucsia",
        numero:37,
        cantidad:1,
        img: "img/variettafucsiaa.jpg" 
    },
    {
        id: 12,
        marca: "vizzano",
        categoria: "sandalias",
        precio: 4490,
        color:"blanco",
        numero:39,
        cantidad:1,
        img: "img/viztacop.jpg" 
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
const categorias = selectID('categorias')


// ARRAY DE PRODUCTOS EN CARRITO 

let carrito = []

// RECORRO Y RENDERIZO ARRAY DE PRODUCTOS

productos.forEach((x) => {

    const div = document.createElement('div')
    div.classList.add('col-md-3')
    div.innerHTML = `
            <div class="card mt-4 p-1" style="width: 18rem;">
                <img src="${x.img}" class="card-img-top mx-auto d-block" alt="${x.categoria}" widht="200" heigth="200">
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
        html.classList.add("row", "d-flex", "align-items-center", "justify-content-around")
        html.innerHTML = `
            <div class="col-md-3 h6">
                <img src="${x.img}" alt="" width="60">
            </div>
            <div class="col-md-3 h6">
                Cantidad: <b> ${x.cantidad}</b> 
            </div>
            <div class="col-md-3 h6">
                Valor: <b>$${x.precio}</b>
            </div>
            <div class="col-md-3">
                <button class="border-0 bg-transparent" onclick="eliminarProducto(${x.id})"><i class="fa-regular fa-trash-can text-danger" style="margin-left:30px;"></i></button>
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


const productos_categorias = [];

productos.forEach(x => {
    if (!productos_categorias.includes(x.categoria)){
        productos_categorias.push(x.categoria)
    }
})


console.log(productos_categorias)




// let porCategoria = {};

// productos.forEach( (x) => {
//     if (!porCategoria.hasOwnProperty(x.categoria)){
//         porCategoria[x.categoria] = {
//             productosCategoria: []
//         }
//     }

//     porCategoria[x.categoria].productosCategoria.push({
//         categorias: x.categoria
//     })
// })

// console.log(porCategoria)





