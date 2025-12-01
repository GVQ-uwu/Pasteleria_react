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
    <section
      className="container fade-in"
      style={{
        marginTop: 50,
        textAlign: "center",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <h1 className="auth-title" style={{ fontSize: "2.2rem", marginBottom: 20 }}>
        Sobre Nosotros
      </h1>
      <p style={{ maxWidth: 750, margin: "0 auto 40px", color: "#555" }}>
        En <strong>Pastelería Sabores</strong> creemos que cada bocado puede contar una historia.
        Desde nuestros inicios familiares en 2023, trabajamos para llevar dulzura, tradición y
        calidad a cada mesa.
      </p>

      {/* Mini Navbar */}
      <nav
        className="mini-nav card"
        style={{
          margin: "0 auto 40px",
          maxWidth: 700,
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          backgroundColor: "#fff7f9",
          border: "1px solid #f2c4ce",
        }}
      >
        {secciones.map((s) => (
          <button
            key={s.id}
            className="mini-link"
            onClick={() => go(s.id)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "10px 18px",
              fontWeight: "600",
              color: "#b94b67",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ff5c8a")}
            onMouseLeave={(e) => (e.target.style.color = "#b94b67")}
          >
            {s.texto}
          </button>
        ))}
      </nav>

      {/* HISTORIA */}
      <article id="historia" className="info-block" style={{ marginBottom: 60 }}>
        <h2 className="title">Nuestra historia</h2>
        <p className="desc" style={{ maxWidth: 850, margin: "0 auto 25px" }}>
          Nacimos como un pequeño emprendimiento familiar con la misión de rescatar recetas caseras
          y darles un toque moderno. Hoy elaboramos tortas, cheesecakes y postres artesanales con
          ingredientes frescos, ofreciendo también opciones <strong>sin azúcar</strong>,{" "}
          <strong>sin gluten</strong> y <strong>veganas</strong>.
        </p>

        <div
          className="grid grid-2"
          style={{ marginTop: 20, justifyItems: "center", gap: 20 }}
        >
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
            <div
              key={card.titulo}
              className="card"
              style={{
                maxWidth: 350,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderRadius: 12,
                padding: 20,
              }}
            >
              <h3 style={{ color: "#b94b67" }}>{card.titulo}</h3>
              <p className="desc" style={{ color: "#555" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* EQUIPO */}
      <article id="equipo" className="info-block" style={{ marginBottom: 60 }}>
        <h2 className="title">Nuestro equipo</h2>
        <p className="desc" style={{ maxWidth: 700, margin: "0 auto 30px" }}>
          Un grupo de personas apasionadas que comparten el amor por la repostería artesanal.
        </p>

        <div
          className="grid grid-3"
          style={{ justifyItems: "center", gap: 20, flexWrap: "wrap" }}
        >
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
            <div
              key={p.nombre}
              className="product-card"
              style={{
                maxWidth: 300,
                boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: "#fff",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={p.foto}
                alt={p.nombre}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
              <div style={{ padding: 15 }}>
                <h3 style={{ color: "#b94b67", marginBottom: 6 }}>{p.nombre}</h3>
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
                    marginTop: 8,
                  }}
                >
                  {p.etiqueta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* MISIÓN */}
      <article id="mision" className="info-block" style={{ marginBottom: 60 }}>
        <h2 className="title">Misión</h2>
        <p className="desc" style={{ maxWidth: 700, margin: "0 auto 25px" }}>
          Elaborar productos de pastelería artesanal deliciosos, seguros y accesibles, priorizando
          ingredientes frescos, calidad y cercanía con nuestros clientes.
        </p>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 auto",
            textAlign: "left",
            maxWidth: 450,
          }}
        >
          <li>🍓 Producción diaria con control de frescura.</li>
          <li>🌿 Alternativas sin azúcar, sin gluten y veganas.</li>
          <li>🤝 Apoyo a productores locales y comercio justo.</li>
        </ul>
      </article>

      {/* VALORES */}
      <article id="valores" className="info-block" style={{ marginBottom: 60 }}>
        <h2 className="title">Valores</h2>
        <div
          className="grid grid-2"
          style={{ justifyItems: "center", marginTop: 20, gap: 20 }}
        >
          {[
            { titulo: "Calidad", texto: "Materias primas seleccionadas y procesos cuidados." },
            { titulo: "Seguridad", texto: "Buenas prácticas de manufactura y trazabilidad total." },
            { titulo: "Inclusión", texto: "Opciones aptas para todo tipo de dietas y estilos de vida." },
            { titulo: "Sustentabilidad", texto: "Reducción de desperdicios y embalajes reciclables." },
          ].map((v) => (
            <div
              key={v.titulo}
              className="card"
              style={{
                maxWidth: 330,
                borderRadius: 12,
                padding: 20,
                backgroundColor: "#fff7f9",
                boxShadow: "0 3px 6px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ color: "#b94b67" }}>{v.titulo}</h3>
              <p className="desc" style={{ color: "#555" }}>
                {v.texto}
              </p>
            </div>
          ))}
        </div>
      </article>

      <div
        className="hero"
        style={{
          marginTop: 40,
          maxWidth: 800,
          marginInline: "auto",
          padding: 30,
          backgroundColor: "#fff7f9",
          borderRadius: 16,
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <span className="kicker" style={{ color: "#b94b67", fontWeight: "bold" }}>
          Hecho con amor 🍰
        </span>
        <p style={{ marginTop: 10, color: "#555" }}>
          ¿Quieres saber más o colaborar con nuestra pastelería? Visita la sección{" "}
          <strong>Contacto</strong>. ¡Estaremos felices de conversar contigo!
        </p>
      </div>
    </section>
  );
}