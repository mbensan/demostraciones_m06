const axios = require('axios')

const nombre_estacion = process.argv[3]

// primero chequeo que el usuario mando un nombre para la estación
if (nombre_estacion == undefined) {
  console.log('Debe especificar el nombre de la estación')
  process.exit(1)
}

async function getClima(nombre_estacion) {
  console.log(`Obteniendo los datos de la estación ${nombre_estacion}`);
  // 1. Obtenemos los datos de todas las estaciones
  const resp = await axios.get('https://api.gael.cloud/general/public/clima')
  const estaciones = resp.data

  // 2. Buscamos la estacion que nos interesa
  // const estacion = estaciones.find(CRITERIO_BUSQUEDA)
  const estacion = estaciones.find(est => est.Estacion == nombre_estacion)

  // 3. Chequamos si estacion no existiese
  if (estacion == undefined) {
    console.log('Esa estación no existe');
    process.exit(1)
  }

  // 4. Retornamos los datos del clima al usuario
  console.log(`La temperatura en ${nombre_estacion} es de ${estacion.Temp}°C y la humedad es del ${estacion.Humedad}%`);
}

getClima(nombre_estacion)
