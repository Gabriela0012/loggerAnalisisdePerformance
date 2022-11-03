document.addEventListener("DOMContentLoaded", () => {
  fetchData()
})
const fetchData = async () => {
  try {
      const res = await fetch('api/products')
      const data = await res.json()
      console.log(data)
      pintarProductos(data)
      detectarBotones(data)
  } catch (error) {
      console.log(error)
  }
}

const contendorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) => {
  const template = document.querySelector('#template-productos').content
  const fragment = document.createDocumentFragment()
  data.forEach(products => {
      console.log(products)
      template.querySelector('img').setAttribute('src', products.thumbnail)
      template.querySelector('h5').textContent = products.name
      template.querySelector('p span').textContent = products.price
      template.querySelector('button').dataset.id = products.id
      const clone = template.cloneNode(true)
      fragment.appendChild(clone)
  })
  contendorProductos.appendChild(fragment)
}
let carrito = {}

const detectarBotones = (data) => {
  console.log(data)
  const botones = document.querySelectorAll('.card button')

  botones.forEach(btn => {
      btn.addEventListener('click', () => {
        console.log(btn)
        
          const products = data.find(item => item.id === parseInt(btn.dataset.id))
          console.log(products)
          let quantity = 1
          // products.quantity= quantity
          if (carrito.hasOwnProperty(products.id)) {
            products.quantity = carrito[products.id].quantity + 1
          }
          carrito[products.id] = { ...products }
          console.log('carrito', carrito)
          pintarCarrito()
      })
  })
}

const items = document.querySelector('#items')
const pintarCarrito = () => {
  
  //pendiente innerHTML
  items.innerHTML = ''

  const template = document.querySelector('#template-carrito').content
  const fragment = document.createDocumentFragment()

  Object.values(carrito).forEach(products => {
     
      template.querySelector('th').textContent = products.id
      template.querySelectorAll('td')[0].textContent = products.name
      template.querySelectorAll('td')[1].textContent = products.quantity
      template.querySelector('span').textContent = products.price * products.quantity
      
      //botones
      template.querySelector('.btn-info').dataset.id = products.id
      template.querySelector('.btn-danger').dataset.id = products.id

      const clone = template.cloneNode(true)
      fragment.appendChild(clone)
  })

  items.appendChild(fragment)

  pintarFooter()
  accionBotones()
  localStorage.setItem("carritoArray", JSON.stringify(carrito));

}
const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

  footer.innerHTML = ''

  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío</th>
      `
    return
  }

  const template = document.querySelector('#template-footer').content
  const fragment = document.createDocumentFragment()

  // sumar quantity y sumar totales
  const nCantidad = Object.values(carrito).reduce((acc, { quantity }) => acc + quantity, 0)
  const nPrecio = Object.values(carrito).reduce((acc, {quantity, price}) => acc + quantity * price ,0)
  console.log(nPrecio)

  template.querySelectorAll('td')[0].textContent = nCantidad
  template.querySelector('span').textContent = nPrecio

  const clone = template.cloneNode(true)
  fragment.appendChild(clone)

  footer.appendChild(fragment)


  const boton = document.querySelector('#vaciar-carrito')
  boton.addEventListener('click', () => {
      carrito = {}
      pintarCarrito()
  })
  const comprar = document.getElementById ('comprar_carrito')
  comprar.addEventListener("click", () => {
    Swal.fire({
    title: '¡Se realizó su pedido!',
    text: 'En estos dias nos comunicaremos con Ud.',
    icon: 'success',
    confirmButtonText: 'OK'
  	})
	})
}

const accionBotones = () => {
  const botonesAgregar = document.querySelectorAll('#items .btn-info')
  const botonesEliminar = document.querySelectorAll('#items .btn-danger')

  botonesAgregar.forEach(btn => {
      btn.addEventListener('click', () => {
          console.log(btn.dataset.id)
          const products = carrito[btn.dataset.id]
          products.quantity ++
          carrito[btn.dataset.id] = { ...products }
          pintarCarrito()
      })
  })

  botonesEliminar.forEach(btn => {
      btn.addEventListener('click', () => {
          console.log('eliminando...')
          const products = carrito[btn.dataset.id]
          products.quantity--
          if (products.quantity === 0) {
              delete carrito[btn.dataset.id]
          } else {
              carrito[btn.dataset.id] = { ...products }
          }
          pintarCarrito()
      })
  })
}
document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("carritoArray")) {
      carrito = JSON.parse(localStorage.getItem("carritoArray"));
      pintarCarrito();
  }
});