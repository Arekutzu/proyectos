(function () {
  function requireUsuario() {
    const u = localStorage.getItem("usuarioActivo");
    if (!u) {
      window.location.href = "index.html";
      return null;
    }
    return u;
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getSaldos() {
    return readJSON("saldos", {});
  }

  function setSaldos(saldos) {
    writeJSON("saldos", saldos);
  }

  function movimientosKey(usuario) {
    return `movimientos_${usuario}`;
  }

  function registrarMovimiento(usuario, movimiento) {
    const key = movimientosKey(usuario);
    const lista = readJSON(key, []);
    lista.push({
      tipo: movimiento.tipo || "",
      monto: Number(movimiento.monto || 0),
      fecha: new Date().toISOString(),
      detalle: movimiento.detalle || ""
    });
    writeJSON(key, lista);
  }

  window.Core = {
    requireUsuario,
    getSaldos,
    setSaldos,
    registrarMovimiento,
    readJSON,
    writeJSON
  };
  
  window.registrarMovimiento = registrarMovimiento;
})();
