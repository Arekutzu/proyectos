let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function registrarUsuario(email, password, nombres, apellidoP, apellidoM, telefono) {
    if (usuarios.some(u => u.email === email)) {
        alert("Este correo ya está registrado.");
        return false;
    }

    const nuevoUsuario = {
        email,
        password,
        nombres,
        apellidoP,
        apellidoM,
        telefono
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario registrado con éxito.");
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("inputEmail4").value;
        const password = document.getElementById("inputPassword4").value;
        const nombres = document.getElementById("Nombres").value;
        const apellidoP = document.getElementById("Apellido Paterno").value;
        const apellidoM = document.getElementById("apellidoMaterno").value;
        const telefono = document.getElementById("Telefono").value;
        const aceptaTerminos = document.getElementById("gridCheck").checked;

        if (!email || !password || !nombres || !apellidoP || !apellidoM || !telefono) {
            alert("Por favor completa todos los campos.");
            return;
        }

        if (!aceptaTerminos) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        registrarUsuario(email, password, nombres, apellidoP, apellidoM, telefono);
        form.reset();
    });
});

function registrar() {
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;

    if (email === "" || pwd === "") {
        alert("Complete todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    let existe = usuarios.find(u => u.email === email);
    if (existe) {
        alert("Este correo ya está registrado");
        return;
    }

    usuarios.push({ email: email, pwd: pwd });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");
    window.location.href = "index.html";
}
