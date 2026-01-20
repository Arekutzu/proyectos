document.getElementById("loginForm").addEventListener("submit", login);

function login(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let valido = usuarios.find(
        u => u.email === email && u.password === pwd
    );

    if (valido) {
        alert("Bienvenido " + email);
        localStorage.setItem("usuarioActivo", email);
        window.location.href = "Menu principal.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
}
    const form = document.getElementById('contactForm');
    const tabla = document.getElementById('tablaContactos').querySelector('tbody');

    form.addEventListener('submit', function(event) {
      event.preventDefault(); 


      const nombre = document.getElementById('nombre').value;
      const rut = document.getElementById('rut').value;
      const alias = document.getElementById('alias').value;
      const banco = document.getElementById('banco').value;


      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${nombre}</td>
        <td>${rut}</td>
        <td>${alias}</td>
        <td>${banco}</td>
      `;

      tabla.appendChild(fila);

      form.reset();
    });