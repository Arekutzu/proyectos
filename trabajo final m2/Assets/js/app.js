// Inicializar siempre desde localStorage
let saldo = parseFloat(localStorage.getItem("saldo")) || 0;
let historial = JSON.parse(localStorage.getItem("historial")) || [];

// Función para refrescar historial en pantalla
function actualizarHistorial() {
  if($("#historial").length){
    $("#historial").empty();
    historial.forEach(item => {
      $("#historial").append(`<li class="list-group-item">${item}</li>`);
    });
  }
}

// DEPÓSITO
$("#depositForm").on("submit", function(e){
  e.preventDefault();
  let monto = parseFloat($("#monto").val());
  saldo += monto;
  historial.push(`Depósito: $${monto}`);
  localStorage.setItem("saldo", saldo);
  localStorage.setItem("historial", JSON.stringify(historial));
  actualizarHistorial();
  alert("Depósito realizado");
});

// TRANSFERENCIA
$("#sendForm").on("submit", function(e){
  e.preventDefault();
  let contacto = $("#contacto").val();
  let monto = parseFloat($("#montoEnvio").val());
  if(monto <= saldo){
    saldo -= monto;
    historial.push(`Transferencia a ${contacto}: $${monto}`);
    localStorage.setItem("saldo", saldo);
    localStorage.setItem("historial", JSON.stringify(historial));
    actualizarHistorial();
    alert("Transferencia realizada");
  } else {
    alert("Saldo insuficiente");
  }
});

// Al cargar cualquier página
$(document).ready(function(){
  if($("#saldo").length){
    $("#saldo").text(`$${saldo}`);
  }
  actualizarHistorial();
});