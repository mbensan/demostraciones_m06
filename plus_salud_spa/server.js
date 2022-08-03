const express = require('express')
const axios = require('axios')
const uuid = require('uuid')
const moment = require('moment')

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

const users = []

app.get('/users',  (req, res) => {
  res.json({users})
})

app.get('/new-user', async (req, res) => {
  // 1. Pedimos un usuario al azar a la API de randomuser
  const resp = await axios.get('https://randomuser.me/api')
  const random_user = resp.data.results[0]

  // 2. Generamos el ID único
  const id_unico = uuid.v4()

  // 3. Generamos un timestamp usando MomentJS
  const timestamp = moment();

  // 4. creamos el nuevo usuario
  const nuevo_usuario = {
    nombre: `${random_user.name.first} ${random_user.name.last}`,
    email: random_user.email,
    id: id_unico,
    timestamp: timestamp
  }
  users.push(nuevo_usuario)

  res.redirect('/')
})

app.get('*', (req, res) => {
  res.send('Página aún no implementada')
});

app.listen(3000, function () {
  console.log('servidor ejecutando correctamente');
})