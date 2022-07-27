const http = require('http')


const hostname = '127.0.0.1'
const port = 3000

/*
  GET /  =>  Una página
  GET /api => JSON de las divisas
  GET /api/dolar => JSON con datos históricos del dolar
*/


const server = http.createServer( (req, res) => {

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  let respuesta;
  
  if (req.url == '/') {
    respuesta = `
      <html>
        <h2>Servicio caído</h2>
      </html>
    `
  }
  else if (req.url == '/api') {

    respuesta = {
      fecha: new Date(),
      dolar: {
        indicador: 'Dolar EEUU',
        valor: 950
      },
      uf: {
        indicador: 'Unidad de Fomento',
        valor: 33450
      }
    }
    respuesta = JSON.stringify(respuesta)
  }
  else if (req.url == '/api/dolar') {
    respuesta = {
      hoy: 950,
      ayer: 1000,
      anteayer: 'muy caro!'
    }
    respuesta = JSON.stringify(respuesta)
  }
  else {
    respuesta = 'Ruta no implementada'
  }
  
  res.end(respuesta)
} )

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`)
})
