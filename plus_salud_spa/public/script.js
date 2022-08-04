async function cargar_usuarios () {
  // 1. Le pedimos los usuarios a nuestra API
  let resp = await fetch('/users')
  resp = await resp.json()

  // 2. armamos el texto de la UL
  let texto_ul = ''
  for (let user of resp.users) {
    texto_ul += `<li>${user.nombre} (${user.id})</li>`
  }

  // 3. agregamos ese texto al DOM
  document.querySelector('#usuarios').innerHTML = texto_ul

  console.log(resp);
}
cargar_usuarios() 