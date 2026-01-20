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
    const tipoConDetalle = m.detalle ? `${m.tipo} - ${m.detalle}` : (m.tipo || "");
    tr.innerHTML = `
      <td>${tipoConDetalle}</td>
      <td>$${Number(m.monto || 0).toLocaleString("es-CL")}</td>
      <td>${m.fecha ? new Date(m.fecha).toLocaleString("es-CL") : ""}</td>
    `;
    tbody.appendChild(tr);
  });
});
