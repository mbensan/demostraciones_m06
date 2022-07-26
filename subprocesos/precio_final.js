const child_process = require('child_process')

child_process.exec('node precio_inicial.js', function (err, res1) {
  const precio = Number(res1)

  child_process.exec('node descuento.js', function (err2, res2) {
    const descuento = Number(res2)

    const precio_final = precio - (precio*descuento/100);

    console.log(`El precio final es ${precio_final}`);
  })
})

// Crear script que llame a 2 subprocesos. Uno que reciba el num de kilometros, y 
// otro que reciba el consumo. Calcular cuanto $ vale el viaje.