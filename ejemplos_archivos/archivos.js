const fs = require('fs')

function escribir () {
  // fs.writeFile(nombre_archivo, contenido, codificacion, callback)
  const dias_semana = `Lunes\nMartes\nMiércoles\nJuernes\nViernes\nSábado\nDomingo`
  
  fs.writeFile('datos.txt', dias_semana, 'utf8', function() {
    console.log('Archivo escrito correctamente');
  })
  
  console.log('Terminando ejecución');
}

function leer () {
  // fs.readFile(nombre_archivo, codificacion, callback(error, datos))
  fs.readFile('./datos.txt', 'utf8', function(err, datos) {
    console.log(datos);
  })
  console.log('Terminando ejecución');
}

function renombrar () {
  fs.rename('datos.txt', 'dias.txt', function() {
    console.log('Archivo renombrado');
  })
}

function eliminar () {
  fs.unlink('dias.txt', function() {
    console.log('Archivo eliminado');
  })
}

escribir();
leer()
renombrar()
eliminar()