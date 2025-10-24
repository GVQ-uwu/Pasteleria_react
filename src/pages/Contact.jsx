import React, { useState } from "react";

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSent(false);
  };

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "El nombre es obligatorio.";
    if (!values.email.trim()) e.email = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Correo no válido.";
    if (!values.message.trim()) e.message = "Escribe un mensaje.";
    return e;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    console.log("Mensaje enviado:", values);
    setSent(true);
    setValues({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="container" style={{ maxWidth: 550, marginTop: 30 }}>
      <div className="auth-card fade-in">
        <h1 className="auth-title">Contacto</h1>
        <form onSubmit={onSubmit} className="stack-16">
          <div>
            <label className="label" htmlFor="name">Nombre</label>
            <input id="name" className="input" name="name"
                   value={values.name} onChange={onChange} required />
            {errors.name && <p className="help" style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div>
            <label className="label" htmlFor="email">Correo</label>
            <input id="email" className="input" type="email" name="email"
                   value={values.email} onChange={onChange} required />
            {errors.email && <p className="help" style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div>
            <label className="label" htmlFor="phone">Teléfono (opcional)</label>
            <input id="phone" className="input" name="phone"
                   placeholder="+56912345678"
                   value={values.phone} onChange={onChange} />
          </div>

          <div>
            <label className="label" htmlFor="message">Mensaje</label>
            <textarea id="message" className="textarea" rows="4" name="message"
                      value={values.message} onChange={onChange} required />
            {errors.message && <p className="help" style={{ color: "red" }}>{errors.message}</p>}
          </div>

          <button className="btn btn-primary" type="submit">Enviar</button>
          {sent && <p className="help" style={{ color: "#27ae60" }}>¡Mensaje enviado correctamente! 🍰</p>}
        </form>
      </div>
    </section>
  );
}

