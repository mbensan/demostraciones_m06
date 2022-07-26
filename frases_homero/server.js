const http = require('http')
const fs = require('fs').promises

const hostname = '127.0.0.1'
const port = 3000

let frases;
async function init () {
  frases = await fs.readFile('frases.txt', 'utf8')
  frases = frases.split('\r\n')
  // console.log(frases);
}
init()

const server = http.createServer( (req, res) => {
  const pos_azar = Math.floor(Math.random() * frases.length)
  const frase_azar = frases[pos_azar]
  
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(`<h2>${frase_azar}</h2>`)
} )

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`)
})