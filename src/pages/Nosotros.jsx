import React from "react";

export default function Nosotros() {
  // scroll suave a secciones
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="container" style={{ marginTop: 16 }}>
      <h1>Nosotros</h1>

      {/* Mini Navbar (sub-menú) */}
      <div className="mini-nav card" style={{ marginBottom: 20 }}>
        <div className="mini-nav-inner">
          <button className="mini-link" onClick={() => go("historia")}>Nuestra historia</button>
          <button className="mini-link" onClick={() => go("equipo")}>Nuestro equipo</button>
          <button className="mini-link" onClick={() => go("mision")}>Misión</button>
          <button className="mini-link" onClick={() => go("valores")}>Valores</button>
        </div>
      </div>

      {/* HISTORIA */}
      <article id="historia" className="info-block" style={{ marginBottom: 24 }}>
        <h2 className="title">Nuestra historia</h2>
        <p className="desc">
          Pastelería Sabores nació como un emprendimiento familiar en 2023 con la idea de
          rescatar recetas caseras y sumar técnicas modernas. Empezamos con tortas y
          cheesecakes artesanales, y hoy contamos con una carta que incluye opciones
          <strong> sin azúcar</strong>, <strong>sin gluten</strong> y <strong>veganas</strong>, manteniendo
          el sello de <em>ingredientes frescos</em> y producción diaria.
        </p>
        <div className="grid grid-2" style={{ marginTop: 12 }}>
          <div className="card">
            <div className="card-body">
              <h3>Compromiso con lo local</h3>
              <p className="desc">Priorizamos proveedores de la zona para harina, frutas y lácteos.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Calidad y trazabilidad</h3>
              <p className="desc">Cada producto tiene ficha técnica, control de temperatura y rotulado.</p>
            </div>
          </div>
        </div>
      </article>

      {/* EQUIPO */}
      <article id="equipo" className="info-block" style={{ marginBottom: 24 }}>
        <h2 className="title">Nuestro equipo</h2>
        <p className="desc">Un equipo pequeño y apasionado por la pastelería.</p>

        <div className="grid grid-3" style={{ marginTop: 12 }}>
          {/* Card de persona */}
          <div className="product-card">
            <div className="product-media">
              <img
                src="https://placehold.co/600x450?text=Chef+Pastelero"
                alt="Chef Pastelero"
              />
              <span className="product-badge">Pastelería</span>
            </div>
            <div className="product-body">
              <div className="product-title">Valentina R.</div>
              <div className="product-desc">Chef pastelera · Especialista en tortas y glasé.</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-media">
              <img
                src="https://placehold.co/600x450?text=Maestra+Repostera"
                alt="Maestra Repostera"
              />
              <span className="product-badge">Producción</span>
            </div>
            <div className="product-body">
              <div className="product-title">Camila S.</div>
              <div className="product-desc">Repostería saludable · Sin azúcar y sin gluten.</div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-media">
              <img
                src="https://placehold.co/600x450?text=Atenci%C3%B3n+al+Cliente"
                alt="Atención al Cliente"
              />
              <span className="product-badge">Atención</span>
            </div>
            <div className="product-body">
              <div className="product-title">Ignacio M.</div>
              <div className="product-desc">Ventas y despacho · Experiencia de cliente.</div>
            </div>
          </div>
        </div>
      </article>

      {/* MISIÓN */}
      <article id="mision" className="info-block" style={{ marginBottom: 24 }}>
        <h2 className="title">Misión</h2>
        <p className="desc">
          Elaborar pastelería artesanal deliciosa y accesible, con foco en calidad, seguridad
          alimentaria y opciones para todas las personas (tradicionales y con requerimientos
          específicos). Buscamos entregar una experiencia cercana y responsable con la comunidad.
        </p>
        <ul className="stack-8" style={{ marginTop: 8 }}>
          <li>✔️ Producción diaria y control de frescura.</li>
          <li>✔️ Alternativas sin azúcar, sin gluten y veganas.</li>
          <li>✔️ Insumos locales cuando sea posible.</li>
        </ul>
      </article>

      {/* VALORES */}
      <article id="valores" className="info-block" style={{ marginBottom: 24 }}>
        <h2 className="title">Valores</h2>
        <div className="grid grid-2" style={{ marginTop: 8 }}>
          <div className="card">
            <div className="card-body">
              <h3>Calidad</h3>
              <p className="desc">Procesos estandarizados y materias primas seleccionadas.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Seguridad</h3>
              <p className="desc">Buenas prácticas de manufactura y trazabilidad.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Inclusión</h3>
              <p className="desc">Opciones aptas para diferentes necesidades alimentarias.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Sustentabilidad</h3>
              <p className="desc">Reducción de desperdicios y preferencia por proveedores locales.</p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA suave */}
      <div className="hero" style={{ marginTop: 8 }}>
        <span className="kicker">Hecho con amor 🍰</span>
        <p style={{ marginTop: 6 }}>
          ¿Quieres saber más o colaborar con nuestra pastelería? Contáctanos en la sección
          <strong> Contacto</strong>. ¡Felices de conversar!
        </p>
      </div>
    </section>
  );
}

