import React from "react";

export default function Nosotros() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const secciones = [
    { id: "historia", texto: "Nuestra historia" },
    { id: "equipo", texto: "Nuestro equipo" },
    { id: "mision", texto: "Misión" },
    { id: "valores", texto: "Valores" },
  ];

  return (
    <section className="container py-5">
      {/* TÍTULO + INTRO */}
      <div className="text-center mb-4">
        <h1 className="auth-title" style={{ fontSize: "2.2rem" }}>
          Sobre Nosotros
        </h1>
        <p
          style={{
            maxWidth: 750,
            margin: "0 auto",
            color: "#555",
          }}
        >
          En <strong>Pastelería Sabores</strong> creemos que cada bocado puede
          contar una historia. Desde nuestros inicios familiares en 2023,
          trabajamos para llevar dulzura, tradición y calidad a cada mesa.
        </p>
      </div>

      {/* MINI NAVBAR (CENTRADA) */}
      <nav className="card shadow-sm mx-auto mb-5" style={{ maxWidth: 700 }}>
        <div className="d-flex flex-wrap justify-content-center gap-2 p-2">
          {secciones.map((s) => (
            <button
              key={s.id}
              type="button"
              className="btn btn-sm"
              style={{
                borderRadius: 999,
                backgroundColor: "#ffe0ea",
                color: "#b94b67",
                fontWeight: 600,
                border: "none",
              }}
              onClick={() => go(s.id)}
            >
              {s.texto}
            </button>
          ))}
        </div>
      </nav>

      {/* HISTORIA */}
      <article id="historia" className="mb-5">
        <div className="text-center mb-3">
          <h2 className="title">Nuestra historia</h2>
          <p
            className="desc"
            style={{ maxWidth: 850, margin: "0 auto", color: "#555" }}
          >
            Nacimos como un pequeño emprendimiento familiar con la misión de
            rescatar recetas caseras y darles un toque moderno. Hoy elaboramos
            tortas, cheesecakes y postres artesanales con ingredientes frescos,
            ofreciendo también opciones <strong>sin azúcar</strong>,{" "}
            <strong>sin gluten</strong> y <strong>veganas</strong>.
          </p>
        </div>

        <div className="row g-4 justify-content-center mt-2">
          {[
            {
              titulo: "Compromiso con lo local",
              desc: "Priorizamos proveedores regionales para frutas, harinas y lácteos.",
            },
            {
              titulo: "Calidad y trazabilidad",
              desc: "Cada producto cuenta con ficha técnica y control de temperatura.",
            },
          ].map((card) => (
            <div key={card.titulo} className="col-md-6 col-lg-5">
              <div className="card h-100 shadow-sm rounded-3 p-3">
                <h3 style={{ color: "#b94b67" }}>{card.titulo}</h3>
                <p className="desc" style={{ color: "#555" }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* EQUIPO */}
      <article id="equipo" className="mb-5">
        <div className="text-center mb-3">
          <h2 className="title">Nuestro equipo</h2>
          <p
            className="desc"
            style={{ maxWidth: 700, margin: "0 auto", color: "#555" }}
          >
            Un grupo de personas apasionadas que comparten el amor por la
            repostería artesanal.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {[
            {
              nombre: "Valentina R.",
              cargo: "Chef pastelera · Especialista en tortas y glasé.",
              etiqueta: "Pastelería",
              foto: "https://i.pinimg.com/736x/98/9b/ea/989bead350729648f36c666c19128c3b.jpg",
            },
            {
              nombre: "Camila S.",
              cargo: "Repostería saludable · Sin azúcar y sin gluten.",
              etiqueta: "Producción",
              foto: "https://i.pinimg.com/736x/d4/55/dc/d455dc2c06be3f1a11dce9b59932ec95.jpg",
            },
            {
              nombre: "Ignacio M.",
              cargo: "Ventas y despacho · Atención al cliente.",
              etiqueta: "Atención",
              foto: "https://i.pinimg.com/736x/93/05/85/9305859c3e4ee4e2b441e9b694b925a1.jpg",
            },
          ].map((p) => (
            <div key={p.nombre} className="col-sm-6 col-lg-4">
              <div
                className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden"
                style={{ transition: "transform 0.2s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={p.foto}
                  alt={p.nombre}
                  style={{ width: "100%", height: 190, objectFit: "cover" }}
                />
                <div className="p-3">
                  <h3 style={{ color: "#b94b67", fontSize: "1.1rem" }}>
                    {p.nombre}
                  </h3>
                  <p className="desc" style={{ fontSize: 14, color: "#555" }}>
                    {p.cargo}
                  </p>
                  <span
                    style={{
                      backgroundColor: "#ffe0ea",
                      color: "#b94b67",
                      fontSize: 12,
                      padding: "4px 8px",
                      borderRadius: 8,
                      display: "inline-block",
                    }}
                  >
                    {p.etiqueta}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* MISIÓN */}
      <article id="mision" className="mb-5">
        <div className="text-center mb-3">
          <h2 className="title">Misión</h2>
          <p
            className="desc"
            style={{ maxWidth: 700, margin: "0 auto 15px", color: "#555" }}
          >
            Elaborar productos de pastelería artesanal deliciosos, seguros y
            accesibles, priorizando ingredientes frescos, calidad y cercanía con
            nuestros clientes.
          </p>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 auto",
            textAlign: "left",
            maxWidth: 450,
            color: "#555",
          }}
        >
          <li>🍓 Producción diaria con control de frescura.</li>
          <li>🌿 Alternativas sin azúcar, sin gluten y veganas.</li>
          <li>🤝 Apoyo a productores locales y comercio justo.</li>
        </ul>
      </article>

      {/* VALORES */}
      <article id="valores" className="mb-5">
        <div className="text-center mb-3">
          <h2 className="title">Valores</h2>
        </div>

        <div className="row g-4 justify-content-center">
          {[
            {
              titulo: "Calidad",
              texto: "Materias primas seleccionadas y procesos cuidados.",
            },
            {
              titulo: "Seguridad",
              texto: "Buenas prácticas de manufactura y trazabilidad total.",
            },
            {
              titulo: "Inclusión",
              texto:
                "Opciones aptas para todo tipo de dietas y estilos de vida.",
            },
            {
              titulo: "Sustentabilidad",
              texto:
                "Reducción de desperdicios y embalajes reciclables.",
            },
          ].map((v) => (
            <div key={v.titulo} className="col-md-6 col-lg-5">
              <div
                className="card h-100 shadow-sm rounded-3 p-3"
                style={{ backgroundColor: "#fff7f9" }}
              >
                <h3 style={{ color: "#b94b67" }}>{v.titulo}</h3>
                <p className="desc" style={{ color: "#555" }}>
                  {v.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* BLOQUE FINAL */}
      <div className="mx-auto mt-4 mb-3" style={{ maxWidth: 800 }}>
        <div
          className="p-4 rounded-4 shadow-sm"
          style={{ backgroundColor: "#fff7f9" }}
        >
          <span
            className="d-inline-block mb-2"
            style={{ color: "#b94b67", fontWeight: "bold" }}
          >
            Hecho con amor 🍰
          </span>
          <p style={{ color: "#555", margin: 0 }}>
            ¿Quieres saber más o colaborar con nuestra pastelería? Visita la
            sección <strong>Contacto</strong>. ¡Estaremos felices de conversar
            contigo!
          </p>
        </div>
      </div>
    </section>
  );
}
