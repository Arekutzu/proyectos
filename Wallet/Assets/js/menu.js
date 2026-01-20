document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    const saldos = JSON.parse(localStorage.getItem("saldos")) || {};
    const saldoUsuario = Number(saldos[usuarioActivo] || 0);

    const el = document.getElementById("saldo");
    if (el) el.textContent = "$" + saldoUsuario.toLocaleString("es-CL");
  });

    <button onclick="logout()" class="btn btn-danger">Cerrar sesión</button>


    function logout(){
    localStorage.removeItem("usuarioActivo");
    window.location.href="index.html";
    }
  
    if(!localStorage.getItem("usuarioActivo")){
    window.location.href="index.html";
    }   