const http = require('http')
const moment = require('moment')


const hostname = '127.0.0.1'
const port = 3000


const server = http.createServer( (req, res) => {
  const ahora = moment().format('MMMM Do YYYY, h:mm:ss a')
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(`Actualmente es ${ahora}`)
} )

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`)
})