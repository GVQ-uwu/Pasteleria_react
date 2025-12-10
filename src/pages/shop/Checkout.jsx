import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

// ---------------- VALIDACIÓN LUHN ----------------
function validarLuhn(numero) {
  let arr = numero.replace(/\s+/g, "").split("").reverse().map(x => parseInt(x));
  let sum = arr.reduce((acc, val, idx) => {
    if (idx % 2) {
      val *= 2;
      if (val > 9) val -= 9;
    }
    return acc + val;
  }, 0);
  return sum % 10 === 0;
}

// -------------- DETECTAR MARCA TARJETA --------------
function detectarMarca(num) {
  if (!num) return "desconocida";
  if (/^4/.test(num)) return "visa";
  if (/^5[1-5]/.test(num)) return "mastercard";
  return "desconocida";
}

// MÁSCARA: 1234 5678 9012 3456
function maskNumero(num) {
  return num
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export default function Checkout() {
  const { items, total, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const envio = 3000;

  const [direccion, setDireccion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [procesando, setProcesando] = useState(false);
  const [errores, setErrores] = useState({});

  // ----------- MÉTODO DE PAGO -----------
  const [metodoPago, setMetodoPago] = useState("tarjeta");

  // ----------- TARJETA -----------
  const [tarjeta, setTarjeta] = useState({
    numero: "",
    nombre: "",
    exp: "",
    cvv: ""
  });

  const [flipped, setFlipped] = useState(false);
  const marca = detectarMarca(tarjeta.numero.replace(/\s/g, ""));

  const aplicarCupon = () => {
    if (codigo === "BIENVENIDA10") {
      setDescuento(total * 0.1);
      alert("Cupón aplicado ✔ (10% OFF)");
    } else {
      alert("Código no válido");
    }
  };

  const totalFinal = total - descuento + envio;

  // ---------------- HANDLE PAY ----------------
  const handlePay = () => {
    setErrores({});

    if (metodoPago === "tarjeta") {
      let errs = {};
      if (!validarLuhn(tarjeta.numero)) errs.numero = true;
      if (!tarjeta.nombre.trim()) errs.nombre = true;
      if (!tarjeta.exp.trim()) errs.exp = true;
      if (!tarjeta.cvv || tarjeta.cvv.length < 3) errs.cvv = true;

      if (Object.keys(errs).length > 0) {
        setErrores(errs);
        return;
      }
    }

    // Procesar
    setProcesando(true);

    setTimeout(() => {
      clear();
      navigate("/pago-exitoso");
    }, 2000);
  };

  return (
    <div className="container py-4">
      <h1
        className="display-6 mb-4"
        style={{ fontFamily: "Pacifico, cursive", color: "var(--choco)" }}
      >
        Checkout
      </h1>

      <div className="row">

        {/* --------------------- COLUMNA IZQUIERDA --------------------- */}
        <div className="col-lg-8">

          {/* Dirección */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5>Datos de envío</h5>
              <input
                className="form-control"
                placeholder="Dirección completa"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
          </div>

          {/* Descuentos */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5>Descuentos</h5>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Código promocional"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
                <button className="btn btn-accent" onClick={aplicarCupon}>
                  Aplicar
                </button>
              </div>
            </div>
          </div>

          {/* Método de pago */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5>Método de pago</h5>

              <select
                className="form-select"
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
              >
                <option value="tarjeta">💳 Tarjeta de crédito/débito</option>
                <option value="efectivo">💵 Pago al recibir</option>
              </select>

              {metodoPago === "tarjeta" && (
                <div className="mt-3">

                  {/* TARJETA ANIMADA */}
                  <div className={`card-pro-wrapper mb-4 ${flipped ? "flipped" : ""}`}>

                    {/* FRENTE */}
                    <div className="card-pro front">
                      <div className="icono-tarjeta mb-2">
                        {marca === "visa" && "💳 VISA"}
                        {marca === "mastercard" && "💳 Mastercard"}
                        {marca === "desconocida" && "💳 Tarjeta"}
                      </div>

                      <div className="card-pro-number">
                        {tarjeta.numero || "•••• •••• •••• ••••"}
                      </div>

                      <div className="card-pro-name">
                        {tarjeta.nombre || "NOMBRE DEL TITULAR"}
                      </div>

                      <div className="card-pro-exp">
                        {tarjeta.exp || "MM/AA"}
                      </div>
                    </div>

                    {/* DORSO */}
                    <div className="card-pro back">
                      <div className="card-pro-strip"></div>
                      <div className="card-pro-cvv">
                        {tarjeta.cvv || "•••"}
                      </div>
                    </div>
                  </div>

                  {/* Inputs PRO */}

                  {/* Número */}
                  <input
                    type="text"
                    className={`form-control mb-2 ${errores.numero ? "is-invalid" : ""}`}
                    placeholder="1234 5678 9012 3456"
                    value={tarjeta.numero}
                    onChange={(e) =>
                      setTarjeta({
                        ...tarjeta,
                        numero: maskNumero(e.target.value)
                      })
                    }
                    onFocus={() => setFlipped(false)}
                  />
                  <div className="invalid-feedback">Número inválido</div>

                  {/* Nombre */}
                  <input
                    type="text"
                    className={`form-control mb-2 ${errores.nombre ? "is-invalid" : ""}`}
                    placeholder="Nombre del titular"
                    value={tarjeta.nombre}
                    onChange={(e) => setTarjeta({ ...tarjeta, nombre: e.target.value })}
                    onFocus={() => setFlipped(false)}
                  />
                  <div className="invalid-feedback">Ingrese el nombre</div>

                  {/* Exp + CVV */}
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        className={`form-control mb-2 ${errores.exp ? "is-invalid" : ""}`}
                        placeholder="MM/AA"
                        value={tarjeta.exp}
                        onChange={(e) => setTarjeta({ ...tarjeta, exp: e.target.value })}
                        onFocus={() => setFlipped(false)}
                      />
                      <div className="invalid-feedback">Fecha inválida</div>
                    </div>

                    <div className="col-6">
                      <input
                        type="text"
                        className={`form-control mb-2 ${errores.cvv ? "is-invalid" : ""}`}
                        placeholder="CVV"
                        maxLength={4}
                        value={tarjeta.cvv}
                        onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value })}
                        onFocus={() => setFlipped(true)}
                      />
                      <div className="invalid-feedback">CVV inválido</div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

        {/* --------------------- COLUMNA DERECHA (RESUMEN) --------------------- */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">

            <div className="card-body">
              <h5 className="mb-3">Resumen</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>${total.toLocaleString()}</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <strong>${envio.toLocaleString()}</strong>
              </div>

              {descuento > 0 && (
                <div className="d-flex justify-content-between text-success mb-2">
                  <span>Descuento</span>
                  <strong>- ${descuento.toLocaleString()}</strong>
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total a pagar</span>
                <span>${totalFinal.toLocaleString()}</span>
              </div>

              {/* SPINNER */}
              {procesando && (
                <div className="text-center my-3">
                  <div className="spinner-border text-success"></div>
                </div>
              )}

              <button className="btn btn-accent w-100 py-3 mb-2" onClick={handlePay}>
                Pagar
              </button>

              <Link to="/carrito" className="btn btn-outline-accent w-100">
                Volver al carrito
              </Link>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
