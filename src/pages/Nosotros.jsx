import React from "react";

export default function Nosotros() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="container fade-in"
      style={{
        marginTop: 30,
        textAlign: "center", // centramos títulos y párrafos base
      }}
    >
      <h1 className="auth-title">Nosotros</h1>

      {/* Mini Navbar */}
      <div
        className="mini-nav card"
        style={{
          margin: "0 auto 30px",
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        <div className="mini-nav-inner" style={{ justifyContent: "center" }}>
          <button className="mini-link" onClick={() => go("historia")}>
            Nuestra historia
          </button>
          <button className="mini-link" onClick={() => go("equipo")}>
            Nuestro equipo
          </button>
          <button className="mini-link" onClick={() => go("mision")}>
            Misión
          </button>
          <button className="mini-link" onClick={() => go("valores")}>
            Valores
          </button>
        </div>
      </div>

      {/* HISTORIA */}
      <article id="historia" className="info-block" style={{ marginBottom: 40 }}>
        <h2 className="title">Nuestra historia</h2>
        <p className="desc" style={{ maxWidth: 800, margin: "0 auto" }}>
          Pastelería Sabores nació como un emprendimiento familiar en 2023 con la idea de
          rescatar recetas caseras y sumar técnicas modernas. Empezamos con tortas y
          cheesecakes artesanales, y hoy contamos con una carta que incluye opciones{" "}
          <strong>sin azúcar</strong>, <strong>sin gluten</strong> y{" "}
          <strong>veganas</strong>, manteniendo el sello de{" "}
          <em>ingredientes frescos</em> y producción diaria.
        </p>
        <div
          className="grid grid-2"
          style={{ marginTop: 20, justifyItems: "center" }}
        >
          <div className="card" style={{ maxWidth: 340 }}>
            <div className="card-body">
              <h3>Compromiso con lo local</h3>
              <p className="desc">
                Priorizamos proveedores de la zona para harina, frutas y lácteos.
              </p>
            </div>
          </div>
          <div className="card" style={{ maxWidth: 340 }}>
            <div className="card-body">
              <h3>Calidad y trazabilidad</h3>
              <p className="desc">
                Cada producto tiene ficha técnica, control de temperatura y rotulado.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* EQUIPO */}
      <article id="equipo" className="info-block" style={{ marginBottom: 40 }}>
        <h2 className="title">Nuestro equipo</h2>
        <p className="desc" style={{ maxWidth: 700, margin: "0 auto" }}>
          Un equipo pequeño y apasionado por la pastelería.
        </p>

        <div
          className="grid grid-3"
          style={{
            marginTop: 20,
            justifyItems: "center",
          }}
        >
          {[
            {
              nombre: "Valentina R.",
              cargo: "Chef pastelera · Especialista en tortas y glasé.",
              etiqueta: "Pastelería",
              foto: "https://placehold.co/600x450?text=Chef+Pastelero",
            },
            {
              nombre: "Camila S.",
              cargo: "Repostería saludable · Sin azúcar y sin gluten.",
              etiqueta: "Producción",
              foto: "https://placehold.co/600x450?text=Maestra+Repostera",
            },
            {
              nombre: "Ignacio M.",
              cargo: "Ventas y despacho · Experiencia de cliente.",
              etiqueta: "Atención",
              foto: "https://placehold.co/600x450?text=Atencion+al+Cliente",
            },
          ].map((p) => (
            <div key={p.nombre} className="product-card" style={{ maxWidth: 320 }}>
              <div className="product-media">
                <img src={p.foto} alt={p.nombre} />
                <span className="product-badge">{p.etiqueta}</span>
              </div>
              <div className="product-body">
                <div className="product-title">{p.nombre}</div>
                <div className="product-desc">{p.cargo}</div>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* MISIÓN */}
      <article id="mision" className="info-block" style={{ marginBottom: 40 }}>
        <h2 className="title">Misión</h2>
        <p className="desc" style={{ maxWidth: 700, margin: "0 auto" }}>
          Elaborar pastelería artesanal deliciosa y accesible, con foco en calidad,
          seguridad alimentaria y opciones para todas las personas (tradicionales y con
          requerimientos específicos). Buscamos entregar una experiencia cercana y
          responsable con la comunidad.
        </p>
        <ul
          className="stack-8"
          style={{
            marginTop: 20,
            listStyle: "none",
            padding: 0,
            textAlign: "left",
            display: "inline-block",
          }}
        >
          <li>✔️ Producción diaria y control de frescura.</li>
          <li>✔️ Alternativas sin azúcar, sin gluten y veganas.</li>
          <li>✔️ Insumos locales cuando sea posible.</li>
        </ul>
      </article>

      {/* VALORES */}
      <article id="valores" className="info-block" style={{ marginBottom: 40 }}>
        <h2 className="title">Valores</h2>
        <div
          className="grid grid-2"
          style={{
            justifyItems: "center",
            marginTop: 16,
          }}
        >
          {[
            {
              titulo: "Calidad",
              texto:
                "Procesos estandarizados y materias primas seleccionadas.",
            },
            {
              titulo: "Seguridad",
              texto: "Buenas prácticas de manufactura y trazabilidad.",
            },
            {
              titulo: "Inclusión",
              texto: "Opciones aptas para diferentes necesidades alimentarias.",
            },
            {
              titulo: "Sustentabilidad",
              texto: "Reducción de desperdicios y apoyo a productores locales.",
            },
          ].map((v) => (
            <div key={v.titulo} className="card" style={{ maxWidth: 340 }}>
              <div className="card-body">
                <h3>{v.titulo}</h3>
                <p className="desc">{v.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <div className="hero" style={{ marginTop: 8, maxWidth: 800, marginInline: "auto" }}>
        <span className="kicker">Hecho con amor 🍰</span>
        <p style={{ marginTop: 6 }}>
          ¿Quieres saber más o colaborar con nuestra pastelería? Contáctanos en la sección{" "}
          <strong>Contacto</strong>. ¡Felices de conversar!
        </p>
      </div>
    </section>
  );
}


