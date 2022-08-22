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

const documento = document;
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

function createCards(array) {

    array.forEach((x) => {

        if (!productos_categorias.includes(x.categoria)) {
            productos_categorias.push(x.categoria)

        }

        const div = document.createElement('div')
        div.classList.add('col', 'col-md-3', 'renderCard')
        div.innerHTML = `
            <div class="card mt-4 p-1 border-0 mx-auto producto" style="width: 15rem;">
                <img src="${x.img}" class="card-img-top mx-auto d-block w-55" alt="${x.categoria}" >
                <div class="card-body text-center ">
                    <h5 class="card-title">${x.categoria}-${x.marca}</h5>
                    <h5>N${x.numero}-${x.color}</h5>
                    <p class="card-text h3">$${x.precio}</p>
                    <a id="btnAgregar${x.id}" class="btn btn-primary" ">Lo quiero! <i class="fa-solid fa-heart-circle-plus"></i></a>
                </div>
            </div>
        `;

        contenedor.prepend(div);

        const btnCarrito = selectID(`btnAgregar${x.id}`)
        btnCarrito.addEventListener('click', () => {
            agregarAlCarrito(x.id)
        })
    })
}

createCards(productos)


for (let i = 0; i < productos_categorias.length; i++) {
    let contenido = ""
    contenido += `<li type="button" id="categoria${productos_categorias[i]}" class="text-decoration-none text-dark p-2" onclick="btnCategoria(${productos_categorias[i]})">${productos_categorias[i]}</li>`
    categorias.innerHTML += contenido

}





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

const Sandalias = arrayCategorias.filter(x => x.categoria == "Sandalias")
const Stilettos = arrayCategorias.filter(x => x.categoria == "Stilettos")
const Botas = arrayCategorias.filter(x => x.categoria == "Botas")

function btnCategoria(array) {
    contenedor.innerHTML = ""
    createCards(array)
}


// FILTRO DE BUSQUEDA

document.addEventListener("keyup", (e) => {

    if (e.target.value == "Esc") e.target.value = "";

    if (e.target.matches('#buscador')) {
        document.querySelectorAll(".producto").forEach(x => {
            x.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? x.classList.remove("filtro")
                : x.classList.add("filtro")
        })
    }
})


// CONTACTO + VALIDACION FORMULARIO


const contacto = selectID('contacto')

function validarFormContacto() {
    const nombre = document.getElementById('inputNombre').value
    const nombreError = document.getElementById('inputNombreError')
    const email = document.getElementById('inputEmail').value
    const emailError = document.getElementById('inputEmailError')
    const textArea = document.getElementById('textArea').value
    const textAreaError = document.getElementById('textAreaError')

    if (nombre.trim() == "" || nombre.length == 0 || nombre == null) {
        nombreError.innerHTML = "Falta Completar Campo Nombre";
        return false
    } else {
        nombreError.innerHTML = ""
    }

    if (email.trim() == "" || email.length == 0 || email == null) {
        emailError.innerHTML = "Falta Completar Campo Email";
        return false
    } else if (!email.includes("@") || !email.includes(".")) {
        emailError.innerHTML = "Ingrese un mail Valido"
        return false
    } else {
        emailError.innerHTML = ""
    }

    if (textArea.trim() == "" || textArea.length < 10 || textArea == null) {
        textAreaError.innerHTML = "Complete su mensaje";
        return false
    } else {
        textAreaError.innerHTML = ""
    }

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    Toast.fire({
        icon: 'success',
        title: 'Mensaje enviado Muchas Gracias!'
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






