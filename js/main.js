const productos = [
    {
        id: 1,
        marca: "vizzano",
        categoria: "Botas",
        precio: 11790,
        color: "marron",
        numero: 34,
        cantidad: 1,
        img: "img/botasvizMarron.jpg"
    },
    {
        id: 2,
        marca: "ramarin",
        categoria: "Sandalias",
        precio: 8590,
        color: "jean",
        numero: 36,
        cantidad: 1,
        img: "img/sandaliasRamarinJean.jpg"
    },
    {
        id: 3,
        marca: "ene",
        categoria: "Botas",
        precio: 12390,
        color: "gris",
        numero: 38,
        cantidad: 1,
        img: "img/enereptilgris.jpg"
    },
    {
        id: 4,
        marca: "vizzano",
        categoria: "Sandalias",
        precio: 7480,
        color: "roja",
        numero: 36,
        cantidad: 1,
        img: "img/sandaliasVizRoja.jpg"
    },

    {
        id: 5,
        marca: "varietta",
        categoria: "Stilettos",
        precio: 6290,
        color: "turquesa",
        numero: 39,
        cantidad: 1,
        img: "img/stilettosVarTur.jpg"
    },
    {
        id: 6,
        marca: "viauno",
        categoria: "Sandalias",
        precio: 9990,
        color: "amarillo",
        numero: 36,
        cantidad: 1,
        img: "img/viaUnoTachoChinoAmarillo.jpg"
    },
    {
        id: 7,
        marca: "varietta",
        categoria: "Sandalias",
        precio: 8490,
        color: "animal print",
        numero: 37,
        cantidad: 1,
        img: "img/sandaliasVarRojacnpelo.jpg"
    },
    {
        id: 8,
        marca: "beira rio",
        categoria: "Sandalias",
        precio: 7490,
        color: "negro",
        numero: 40,
        cantidad: 1,
        img: "img/beiraTachoChino.jpg"
    },
    {
        id: 9,
        marca: "varietta",
        categoria: "Stilettos",
        precio: 6490,
        color: "amarillo",
        numero: 37,
        cantidad: 1,
        img: "img/variettaamar.jpg"
    },
    {
        id: 10,
        marca: "varietta",
        categoria: "Stilettos",
        precio: 5490,
        color: "animal print",
        numero: 37,
        cantidad: 1,
        img: "img/variettaanimalb.jpg"
    },
    {
        id: 11,
        marca: "varietta",
        categoria: "Stilettos",
        precio: 6290,
        color: "multicolor",
        numero: 37,
        cantidad: 1,
        img: "img/variettamultic.jpg"
    },
    {
        id: 12,
        marca: "vizzano",
        categoria: "Sandalias",
        precio: 7480,
        color: "blanco",
        numero: 39,
        cantidad: 1,
        img: "img/viztacop.jpg"
    },
]

class Productos {
    constructor(id, marca, categoria, precio, color, numero, cantidad, img) {
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

function agregarAlStock(nombreProducto) {
    productos.push(nombreProducto)
}

// FUNCION PARA SELECCIONAR POR ID ELEMENTOS DEL DOM

function selectID(id) {
    return document.getElementById(id);
}

const contenedor = selectID('contenedor-productos')
const contenedorCarrito = selectID('contenedorCarrito')
const contenedorModal = selectID('contenedorModal')
const vaciarCarrito = selectID('vaciarCarrito')
const cantidadProductosCarrito = selectID('cantidadProductos')
const totalAPagar = selectID('totalPagar')
const categorias = selectID('categorias')



let carrito = []

const productos_categorias = [];

// RECORRO Y RENDERIZO ARRAY DE PRODUCTOS

productos.forEach((x) => {

    if (!productos_categorias.includes(x.categoria)) {
        productos_categorias.push(x.categoria)
    }

    const div = document.createElement('div')
    div.classList.add('col', 'col-md-3')
    div.innerHTML = `
            <div class="card mt-4 p-1 border-0 mx-auto" style="width: 15rem;">
                <img src="${x.img}" class="card-img-top mx-auto d-block w-55" alt="${x.categoria}" >
                <div class="card-body text-center">
                    <h5 class="card-title">${x.categoria}-${x.marca}</h5>
                    <h5>N${x.numero}-${x.color}</h5>
                    <p class="card-text h3">$${x.precio}</p>
                    <a id="btnAgregar${x.id}" href="#" class="btn btn-primary" ">Lo quiero! <i class="fa-solid fa-heart-circle-plus"></i></a>
                </div>
            </div>
        `;

    contenedor.prepend(div);

    const btnCarrito = selectID(`btnAgregar${x.id}`)
    btnCarrito.addEventListener('click', () => {
        agregarAlCarrito(x.id)
    })
})


////////////////////////////////////////////////////////////////////
// ORDENO POR CATEGORIA EN EL BOTON PRODUCTOS DEL NAVBAR // FALTA COMPLETAR


for (let i = 0; i < productos_categorias.length; i++) {
    let contenido = ""
    contenido += `<li><a href="#" id="categoria${productos_categorias[i]}" class="text-decoration-none text-dark p-2">${productos_categorias[i]}<a></li>`
    categorias.innerHTML += (contenido)
}
document.getElementById(`categoriaBotas`).addEventListener('click', yella)
document.getElementById(`categoriaStilettos`).addEventListener('click', yella)
document.getElementById(`categoriaSandalias`).addEventListener('click', yella)

function yella() {
    console.log("HOLA!!")
}
////////////////////////////////////////////////////////////////////////

// AGREGO PRODUCTOS AL CARRITO, EN CASO DE REPETIR ITEM LOS SUMO AL IGUAL QUE SU PRECIO.

function agregarAlCarrito(id) {
    Toastify({
        gravity: "bottom",
        position: "right",
        text: "Producto Agregado",
        duration: 2000,
        style: { borderRadius: "30px" }
    }).showToast();
    const repetido = carrito.some((x) => x.id === id)
    if (repetido) {
        const x = carrito.map(x => {
            if (x.id === id) {
                x.cantidad++
                x.precio += x.precio
            }
        })
    } else {
        const item = productos.find((x) => x.id === id);
        carrito.push(item);
    }
    actualizarCarrito()
}

// ACTUALIZO Y RENDERIZO CARRITO EN MODAL. ALMACENO DATOS EN LA LOCALSTORAGE

function actualizarCarrito() {
    contenedorModal.innerHTML = "";
    carrito.forEach((x) => {
        let html = document.createElement('div')
        html.classList.add("row", "d-flex", "align-items-center", "justify-content-around")
        html.innerHTML = `
            <div class="col col-sm-3 h6">
                <img src="${x.img}" alt="" width="60">
            </div>
            <div class="col col-sm-3 h6">
                Cantidad: <b> ${x.cantidad}</b> 
            </div>
            <div class="col col-sm-3 h6">
                Precio: <b>$${x.precio}</b>
            </div>
            <div class="col col-sm-3">
                <button class="border-0 bg-transparent" onclick="eliminarProducto(${x.id})"><i class="fa-regular fa-trash-can text-danger" ></i></button>
            </div>
        `
        contenedorModal.prepend(html)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    cantidadProductosCarrito.innerText = carrito.reduce((acc, x) => acc + x.cantidad, 0)
    totalAPagar.innerText = carrito.reduce((acc, x) => acc + x.precio, 0)
}

// ELIMINAR INDIVIDUALMENTE CADA PRODUCTO DEL CARRITO 

function eliminarProducto(id) {
    Toastify({
        text: "Producto Eliminado",
        duration: 1000,
        style: {
            // background: "#ff000094",
            background: "linear-gradient(to right, #ff000079, red)",
            borderRadius: "30px"
        },
    }).showToast();
    const item = carrito.find(x => x.id === id);
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1);
    localStorage.removeItem('carrito')
    actualizarCarrito();
}

// ELIMINA LA TOTALIDAD DEL CARRITO

vaciarCarrito.addEventListener('click', () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El Carrito fue vaciado con Exito!',
        showConfirmButton: false,
        timer: 1500
    })
    carrito.length = 0;
    localStorage.removeItem('carrito')
    actualizarCarrito()
})

// OBTIENE LOS DATOS DE LOCALSTORAGE

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})



// CREO UNA COPIA DEL ARRAY DE PRODUCTOS PARA ORDENARLA SEGUN SU CATEGORIA(STILETTOS, BOTAS, SANDALIAS)

const arrayCategorias = [...productos]

arrayCategorias.sort((a, b) => {
    if (a.categoria < b.categoria) {
        return -1
    }
    if (a.categoria > b.categoria) {
        return 1
    }
    return 0;
})



// CONTACTO 

const contacto = selectID('contacto')

contacto.addEventListener('click', renderContacto)

function renderContacto() {
    Swal.fire({
        imageUrl: 'img/mail.gif',
        imageAlt: 'imagen de contacto',
        imageWidth: 150,
        html: `
        

        <div class="mb-3 text-start containerName">
            <label  class="form-label"></label>
            <input type="name" class="inputName"  placeholder="Alias">
            <span class="bottom"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="left"></span>
            
        </div>
        <div class="containerName text-start">
            <label  class="form-label"></label>
            <input type="email" class="inputName"  placeholder="name@example.com">
            <span class="bottom"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="left"></span>      
        </div>
        <div class="mb-3 text-start containerName" style="margin-top: 15px;">
            <label class="form-label"></label>
            <textarea class="inputName"  rows="3" placeholder="Mensaje"></textarea>
            <span class="bottom"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="left"></span>
        </div>
        `,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa-solid fa-paper-plane"></i> Enviar!',
        confirmButtonAriaLabel: 'Enviar Consulta',
        confirmButtonColor: '#0d6efd',
    })
}


// NOSOTROS

const nosotros = selectID('nosotros')

nosotros.addEventListener('click', renderNosotros)

function renderNosotros() {
    Swal.fire({
        title: 'Te Preguntas quienes somos?',
        imageUrl: 'img/family.gif',
        imageWidth: 250,
        text: 'Somos un matrimonio tucumano que se dedica al rubro femenino desde hace 4 años. Sabemos QUE y COMO hacer felices a nuestras clientas! y claro eso viene acompañado siempre de Calidad, Glamour y un excelente precio de competencia. Te invitamos a que conozcas nuestros productos si aun no lo has hecho!!',
        showClass: {
            popup: 'animate__animated animate__zoomInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOut'
        },
        confirmButtonColor: '#0d6efd',
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
    })
}