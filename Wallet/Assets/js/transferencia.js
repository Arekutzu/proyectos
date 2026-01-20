
document.addEventListener("DOMContentLoaded", () => {
  const inputNombre = document.getElementById("Nombres");
  const inputRut = document.getElementById("Rut");
  const inputBanco = document.getElementById("BankName");
  const inputMonto = document.getElementById("Monto");
  if (!inputNombre || !inputRut || !inputBanco || !inputMonto) return;

  const usuarioActivo = Core.requireUsuario();
  if (!usuarioActivo) return;


  const contacto = JSON.parse(localStorage.getItem("contactoTransferencia") || "null");

  if (contacto) {
    inputNombre.value = contacto.nombre || "";
    inputRut.value = contacto.rut || "";
    inputBanco.value = contacto.banco || "";

 
    inputNombre.readOnly = true;
    inputRut.readOnly = true;
    inputBanco.readOnly = true;
  }

  window.enviar = function () {
    const monto = Number(inputMonto.value);
    if (!Number.isFinite(monto) || monto <= 0) {
      alert("Ingresa un monto válido mayor a 0");
      return;
    }

    const destinatarioRut = String(inputRut.value || "").trim();
    const destinatarioNombre = String(inputNombre.value || "").trim();

    if (!destinatarioRut) {
      alert("Falta el RUT del destinatario");
      return;
    }

    if (destinatarioRut === usuarioActivo) {
      alert("No puedes transferirte a tu propia cuenta");
      return;
    }

    const saldos = Core.getSaldos();
    const saldoOrigen = Number(saldos[usuarioActivo] || 0);

    if (monto > saldoOrigen) {
      alert("Fondos insuficientes");
      return;
    }

    saldos[usuarioActivo] = saldoOrigen - monto;

    const saldoDestino = Number(saldos[destinatarioRut] || 0);
    saldos[destinatarioRut] = saldoDestino + monto;

    Core.setSaldos(saldos);

    Core.registrarMovimiento(usuarioActivo, {
      tipo: "Transferencia",
      monto,
      detalle: `A: ${destinatarioNombre || "Destinatario"} (${destinatarioRut})`
    });

    Core.registrarMovimiento(destinatarioRut, {
      tipo: "Transferencia recibida",
      monto,
      detalle: `De: ${usuarioActivo}`
    });

    localStorage.removeItem("contactoTransferencia");
    inputMonto.value = "";

    window.location.href = "transaccion.html";
  };
});
