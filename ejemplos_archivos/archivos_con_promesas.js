const fs = require('fs').promises


function createTO() {
  return new Promise((res, rej) => {
    setTimeout(res, 2000)
  })
}

async function escribir () {
  let items = ['1 Kg Manzana Fuji', 'Aceite 1Lt Girasol',
                'Café Molido 1Kg', 'Costa CLassic Bitter 65%']
  items = items.join('\n')

  await fs.writeFile('shopping.txt', items, 'utf8')

  const contenido = await fs.readFile('shopping.txt', 'utf8')

  console.log(contenido);

  await fs.rename('shopping.txt', 'lista_compras.txt')
  await fs.unlink('lista_compras.txt')
  console.log('script terminado!');
}
escribir()