const form_crear = document.querySelector('#form-crear')
const nombre_crear = document.querySelector('#nombre-crear')
const contenido_crear = document.querySelector('#contenido-crear')

form_crear.addEventListener('submit', async function (evento) {
  // 1. Evito que se envie el formulario
  evento.preventDefault()

  // 2. Obtengo el valor de los campos del formulario
  const nombre = nombre_crear.value
  const contenido = contenido_crear.value

  // 3. envio la solicitud por ajax
  let respuesta = await fetch('/crear-ajax', {
    method: 'POST',
    body: JSON.stringify({
      nombre,
      contenido
    })
  })

  // 4. Desempaqueto la respuesta
  respuesta = await respuesta.text()

  // 5. Se la mostramos al usuario
  Swal.fire(respuesta)

  // 6. Limpio los campos del formulario
  nombre_crear.value = ''
  contenido_crear.value = ''
})


const form_leer = document.querySelector('#form-leer')
const nombre_leer = document.querySelector('#nombre-leer')

form_leer.addEventListener('submit', async function (evento) {
  // 1. Evito que se envie el formulario
  evento.preventDefault()

  // 2. Obtengo el valor de los campos del formulario
  const nombre = nombre_leer.value

  // 3. envio la solicitud por ajax
  let respuesta = await fetch(`/leer?nombre=${nombre}`)

  // 4. Desempaqueto la respuesta
  respuesta = await respuesta.text()

  // 5. Se la mostramos al usuario
  Swal.fire(respuesta)

  // 6. Limpio los campos del formulario
  nombre_crear.value = ''
  contenido_crear.value = ''
})