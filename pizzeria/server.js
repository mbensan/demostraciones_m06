const express = require('express')
const fs = require('fs').promises

const app = express()

app.use(express.static('static'))


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());


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