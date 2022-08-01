const express = require('express');
const fs = require('fs').promises;
const Jimp = require('jimp')

const app = express()

// para usar archivos estáticos
app.use(express.static('public'))

// para leer datos de formulario
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

function getForm(req) {
  return new Promise((res, rej) => {
    let str = ''
    req.on('data', function (chunk) {
      str += chunk
    })
    req.on('end', function () {
      console.log('str', str);
      const obj = JSON.parse(str)
      res(obj)
    })
  })
}

// RUTAS
/*
app.post('/pizza', async (req, res) => {
  const datos = await getForm(req)
  console.log(datos);
  res.json({tudo: 'bem'})
});
*/

app.get('/crear', async (req, res) => {
  // 1. recuperar los datos del formulario
  const nombre = req.query.nombre
  const contenido = req.query.contenido

  const hoy = new Date()
  // 2. creamos el nuevo archivo
  await fs.writeFile(`files/${nombre}.txt`, `${hoy}\n${contenido}`, 'utf-8')
  // 3. retornamos una respuesta al usuario
  res.send('Archivo creado')
})

app.get('/leer', async (req, res) => {
  // 1. Recuperamos datos del formulario
  const nombre = req.query.nombre

  // 2. Leemos el archivo
  let contenido = await fs.readFile(`files/${nombre}.txt`, 'utf-8')

  // 2.5 Agregamos saltos de línea
  contenido = contenido.split('\n').join('<br>')
  
  // 3. retornamos una respuesta al usuario
  res.send(contenido)
})

app.post('/crear-ajax', async (req, res) => {
  // 0. Recuperamos el formulario
  const form = await getForm(req)

  // 1. recuperar los datos del formulario
  const nombre = form.nombre
  const contenido = form.contenido

  const hoy = new Date()
  // 2. creamos el nuevo archivo
  await fs.writeFile(`files/${nombre}.txt`, `${hoy}\n${contenido}`, 'utf-8')
  // 3. retornamos una respuesta al usuario
  res.send('Archivo creado')
})

app.get('/sepia-imagen', async (req, res) => {
  // 1. Cargamos la fuente
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
  
  // 2. leemos la imagen desde el QueryString (formulario con GET)
  const imagen = await Jimp.read(req.query.imagen)
  
  // 3. Modificamos la imagen, y la guardamos
  imagen.sepia().print(font, 20, 20, 'La juventud de todos XD')
  .write('public/foto-sepia.jpg')

  // 4. Redirigimos al usuario a la imagen recién creada
  res.redirect('/foto-sepia.jpg')
})

app.get('*', (req, res) => {
  res.send('Página aún no implementada')
});

app.listen(3000, function () {
  console.log('servidor ejecutando correctamente');
})