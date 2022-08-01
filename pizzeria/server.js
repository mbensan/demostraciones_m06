const express = require('express')
const fs = require('fs').promises

const app = express()

app.use(express.static('static'))


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
// forma más sencilla de obtnerr datos de un POST ajax
app.post('/pizza', async (req, res) => {
  const datos = await getForm(req)
  console.log(datos);
  res.json({tudo: 'bem'})
});

// forma compleja de obtener datos de un POST ajax
app.post('/pizza', (req, res) => {
  // típica estructura para obtener datos de un POST
  let str = ''
  req.on('data', function (parte) {
    str += parte;
  })
  req.on('end', function () {
    const form = JSON.parse(str)
    console.log(form.pizza);
    res.json({todo: 'ok'})
  })
})


app.get('/pizza', (req, res) => {
  console.log(req.query);
  res.json({todo: 'ok'})
})


app.get('*', (req, res) => {
  res.send('Página aún no implementada')
});

app.listen(3000, function () {
  console.log('servidor ejecutando correctamente');
})