document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tablaMovimientos");
  if (!tbody) return; 

  const usuarioActivo = localStorage.getItem("usuarioActivo");
  if (!usuarioActivo) {
    window.location.href = "index.html";
    return;
  }

  const key = `movimientos_${usuarioActivo}`;
  const movimientos = JSON.parse(localStorage.getItem(key)) || [];

  tbody.innerHTML = "";
  movimientos.slice().reverse().forEach((m) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.tipo || ""}</td>
      <td>$${Number(m.monto || 0).toLocaleString("es-CL")}</td>
      <td>${m.fecha ? new Date(m.fecha).toLocaleString("es-CL") : ""}</td>
    `;
    tbody.appendChild(tr);
  });
});

function registrarMovimiento(usuario, movimiento) {
  const key = `movimientos_${usuario}`;
  const lista = JSON.parse(localStorage.getItem(key)) || [];

  lista.push({
    tipo: movimiento.tipo || "",
    monto: Number(movimiento.monto || 0),
    fecha: new Date().toISOString(),
    detalle: movimiento.detalle || ""
  });

  localStorage.setItem(key, JSON.stringify(lista));
}

window.registrarMovimiento = registrarMovimiento;
