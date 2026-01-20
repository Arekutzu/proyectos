document.addEventListener("DOMContentLoaded", () => {
  const depositForm = document.getElementById("deposit-form");
  const withdrawForm = document.getElementById("withdraw-form");

  if (!depositForm || !withdrawForm) return;

  const depositInput = document.getElementById("deposit-amount");
  const withdrawInput = document.getElementById("discount-amount");

  const usuarioActivo = localStorage.getItem("usuarioActivo");
  if (!usuarioActivo) {
    window.location.href = "index.html";
    return;
  }

  function getSaldos() {
    return JSON.parse(localStorage.getItem("saldos")) || {};
  }
  function setSaldos(saldos) {
    localStorage.setItem("saldos", JSON.stringify(saldos));
  }

  depositForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const monto = Number(depositInput.value);
    if (!Number.isFinite(monto) || monto <= 0) return alert("Monto inválido");

    const saldos = getSaldos();
    saldos[usuarioActivo] = Number(saldos[usuarioActivo] || 0) + monto;
    setSaldos(saldos);

    if (typeof window.registrarMovimiento === "function") {
      window.registrarMovimiento(usuarioActivo, { tipo: "Deposito", monto });
    }

    window.location.href = "transaccion.html";
  });

  withdrawForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const monto = Number(withdrawInput.value);
    if (!Number.isFinite(monto) || monto <= 0) return alert("Monto inválido");

    const saldos = getSaldos();
    const saldoActual = Number(saldos[usuarioActivo] || 0);
    if (monto > saldoActual) return alert("Fondos insuficientes");

    saldos[usuarioActivo] = saldoActual - monto;
    setSaldos(saldos);

    if (typeof window.registrarMovimiento === "function") {
      window.registrarMovimiento(usuarioActivo, { tipo: "Retiro", monto });
    }

    window.location.href = "transaccion.html";
  });
});
