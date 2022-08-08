async function cargar_usuarios () {
  // 1. Le pedimos los usuarios a nuestra API
  let resp = await fetch('/users')
  resp = await resp.json()

  // 2. armamos el texto del TBODY de la tabla
  let texto_tbody = ''
  for (let user of resp.users) {
    texto_tbody += `
      <tr>
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td>
          <a href="/eliminar?id=${user.id}">Eliminar</a>
        </td>
      </tr> 
    `
  }

  // 3. agregamos ese texto al DOM
  document.querySelector('#usuarios').innerHTML = texto_tbody

  console.log(resp);
}
cargar_usuarios() 