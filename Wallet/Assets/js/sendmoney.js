document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const tbody = document.getElementById("tablaContactos").querySelector("tbody");

  const usuarioActivo = localStorage.getItem("usuarioActivo");
  if (!usuarioActivo) {
    window.location.href = "index.html";
    return;
  }

  const contactosKey = `contactos_${usuarioActivo}`;

  const legacy = localStorage.getItem("contactos");
  if (!localStorage.getItem(contactosKey) && legacy) {
    localStorage.setItem(contactosKey, legacy);
  }

  let contactos = JSON.parse(localStorage.getItem(contactosKey)) || [];
  render();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const rut = document.getElementById("rut").value.trim();
    const alias = document.getElementById("alias").value.trim();
    const banco = document.getElementById("banco").value.trim();

    if (!nombre || !rut || !alias || !banco) return;

    contactos.push({ nombre, rut, alias, banco });
    localStorage.setItem(contactosKey, JSON.stringify(contactos));
    render();
    form.reset();
  });

  tbody.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action;
    const index = Number(btn.dataset.index);
    if (!Number.isInteger(index) || index < 0 || index >= contactos.length) return;

    if (action === "eliminar") {
      contactos.splice(index, 1);
      localStorage.setItem(contactosKey, JSON.stringify(contactos));
      render();
    }

    if (action === "transferir") {
      const contacto = contactos[index];
      localStorage.setItem("contactoTransferencia", JSON.stringify(contacto));
      window.location.href = "Transferencia.html";
    }
  });

  function render() {
    tbody.innerHTML = "";
    contactos.forEach((c, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${c.nombre}</td>
        <td>${c.rut}</td>
        <td>${c.alias}</td>
        <td>${c.banco}</td>
        <td>
          <button class="btn btn-primary btn-sm" data-action="transferir" data-index="${index}">
            Transferir
          </button>
          <button class="btn btn-danger btn-sm ms-2" data-action="eliminar" data-index="${index}">
            Eliminar
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
});
