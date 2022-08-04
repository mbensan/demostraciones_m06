const yargs = require('yargs')
const enviar_email = require('./email.js').enviar


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


const argv2 = yargs.command(
  'frase',
  'Comando para buscar una frase de GOT',
  {
    casa: {
      describe: 'Para poder definir el ID de la casa',
      demand: false,
      alias: 'c'
    }
  },
  function (args) {
    let casa = args.casa
    if (! args.casa) {
      casa = Math.ceil(Math.random() * 80)
    }
    console.log(casa);
    // ahora vamos a consultar a la API
  }
).help().argv
// 107.2145

const argv3 = yargs.command(
  'email',
  'Comando para probar el envio de emails',
  {
    asunto: {
      describe: 'asunto del email a ennviar',
      demand: true,
      alias: 'a'
    },
    mensaje: {
      describe: 'contenido del email a enviar',
      demand: true,
      alias: 'm'
    },
    receptor: {
      describe: 'receptor del email',
      demand: false,
      alias: 'r'
    }
  },
  function (args) {
    const receptor = args.receptor || 'mbensan@outlook.com'

    console.log('Enviando correo electrónico');
    enviar_email(receptor, args.asunto, args.mensaje)
  }
).help().argv
