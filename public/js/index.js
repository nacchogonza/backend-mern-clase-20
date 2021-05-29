const socket = io.connect();

socket.on('productos', productos => {
  if (!productos.length) {
    htmlNoProducts = `
    <div style="overflow: hidden; box-sizing: border-box; text-align: center;">
      <div class="bg-warning" style="padding: 5px; text-align: center;">
        <h3>No se encontraron productos cargados</h1>
      </div>
    </div>
    `;
    document.getElementById("tablaDeProductos").innerHTML = htmlNoProducts
    return
  }
  let htmlCode = productos.map(product => (
    `
      <tr>
        <td style="vertical-align: middle;">${product.title}</td>
        <td style="vertical-align: middle;">$ ${product.price}</td>
        <td class="w-25">
          <img src=${product.thumbnail} style="width: 50px;" />
        </td>
      </tr>
    `
    )).join(" ")
  document.getElementById("tablaDeProductos").innerHTML = htmlCode
})

const addProduct = () => {
  let producto = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value
  }

  socket.emit('new-product', producto);

  document.getElementById('title').value = ''
  document.getElementById('price').value = ''
  document.getElementById('thumbnail').value = ''
  return false;
}

socket.on('messages', data => {
  if (data.length) {
    render(data);
  }
});

function render(data) {
    const html = data.map((elem, index) => {
      return(`<div>
            <span class="text-primary"><strong>${elem.author}</strong></span> <span style="color: brown;">${elem.date}</span>:
            <em>${elem.text}</em>  </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const time = new Date();

    const mensaje = {
      author: document.getElementById('username').value,
      text: document.getElementById('texto').value,
      date: `(${time.getDay()}/${time.getMonth()}/${time.getFullYear()}) ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
    };
    socket.emit('new-message', mensaje);

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}