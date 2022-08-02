const yargs = require('yargs')


const argv = yargs.command(
  'saludo',
  'Comando para saludar a la gente',
  {
    nombre: {
      describe: 'Para poder definir el nombre de la persona',
      demand: false,
      alias: 'n'
    }
  },
  function (argumentos) {
    if (argumentos.nombre) {
      console.log(`Buenos días ${argumentos.nombre}`);
    } else {
      console.log('Hola, que tal!');
    }
  }
).help().argv