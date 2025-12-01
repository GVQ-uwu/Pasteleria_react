// Contacto.jsx - COMPLETO
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: 'Consulta general',
    mensaje: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Ajusta la URL según tu backend
      const response = await axios.post('http://localhost:3001/api/contacto', formData);
      
      if (response.data.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          asunto: 'Consulta general',
          mensaje: ''
        });
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setError(err.response?.data?.message || 'Error al enviar el mensaje. Por favor, inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none" style={{ color: 'var(--accent)' }}>
              <i className="bi bi-house me-1"></i> Inicio
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Contacto</li>
        </ol>
      </nav>

      <div className="row">
        {/* Información de contacto */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h3 mb-4" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}>
                <i className="bi bi-chat-left-text me-2"></i>
                Contáctanos
              </h2>
              
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>
                  <i className="bi bi-geo-alt me-2" style={{ color: 'var(--accent)' }}></i>
                  Visítanos
                </h5>
                <p className="text-muted mb-0">
                  Av. Pastelería 1234<br />
                  Local 56, Santiago Centro<br />
                  Santiago, Chile
                </p>
              </div>
              
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>
                  <i className="bi bi-clock me-2" style={{ color: 'var(--accent)' }}></i>
                  Horarios
                </h5>
                <p className="text-muted mb-0">
                  <strong>Lunes a Viernes:</strong> 9:00 - 20:00<br />
                  <strong>Sábados:</strong> 10:00 - 18:00<br />
                  <strong>Domingos:</strong> 11:00 - 16:00
                </p>
              </div>
              
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>
                  <i className="bi bi-telephone me-2" style={{ color: 'var(--accent)' }}></i>
                  Teléfonos
                </h5>
                <p className="text-muted mb-2">
                  <strong>Ventas:</strong> +56 2 1234 5678
                </p>
                <p className="text-muted mb-0">
                  <strong>WhatsApp:</strong> +56 9 8765 4321
                </p>
              </div>
              
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>
                  <i className="bi bi-envelope me-2" style={{ color: 'var(--accent)' }}></i>
                  Correos
                </h5>
                <p className="text-muted mb-2">
                  <strong>General:</strong> contacto@1000sabores.cl
                </p>
                <p className="text-muted mb-0">
                  <strong>Pedidos:</strong> pedidos@1000sabores.cl
                </p>
              </div>
              
              <div>
                <h5 className="mb-3" style={{ color: 'var(--text)' }}>
                  <i className="bi bi-share me-2" style={{ color: 'var(--accent)' }}></i>
                  Síguenos
                </h5>
                <div className="d-flex gap-3">
                  <a href="#" className="text-decoration-none" style={{ color: 'var(--accent)' }}>
                    <i className="bi bi-facebook fs-4"></i>
                  </a>
                  <a href="#" className="text-decoration-none" style={{ color: 'var(--accent)' }}>
                    <i className="bi bi-instagram fs-4"></i>
                  </a>
                  <a href="#" className="text-decoration-none" style={{ color: 'var(--accent)' }}>
                    <i className="bi bi-tiktok fs-4"></i>
                  </a>
                  <a href="#" className="text-decoration-none" style={{ color: 'var(--accent)' }}>
                    <i className="bi bi-whatsapp fs-4"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="h3 mb-4" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}>
                <i className="bi bi-send me-2"></i>
                Envíanos un mensaje
              </h2>
              
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="bi bi-check-circle me-2"></i>
                  ¡Mensaje enviado exitosamente! Te responderemos en breve.
                  <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      style={{ borderColor: 'var(--accent)' }}
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ borderColor: 'var(--accent)' }}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      style={{ borderColor: 'var(--accent)' }}
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="asunto" className="form-label">
                      Asunto *
                    </label>
                    <select
                      className="form-select"
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      required
                      style={{ borderColor: 'var(--accent)' }}
                    >
                      <option value="Consulta general">Consulta general</option>
                      <option value="Pedido especial">Pedido especial</option>
                      <option value="Problema con pedido">Problema con pedido</option>
                      <option value="Sugerencia">Sugerencia</option>
                      <option value="Trabaja con nosotros">Trabaja con nosotros</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje *
                  </label>
                  <textarea
                    className="form-control"
                    id="mensaje"
                    name="mensaje"
                    rows="5"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    style={{ borderColor: 'var(--accent)' }}
                    placeholder="Escribe tu mensaje aquí..."
                  ></textarea>
                  <div className="form-text">
                    Por favor, incluye todos los detalles necesarios para que podamos ayudarte mejor.
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="newsletter"
                      style={{ borderColor: 'var(--accent)' }}
                    />
                    <label className="form-check-label small" htmlFor="newsletter">
                      Suscribirme al newsletter
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-accent px-4 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <hr className="my-4" />
              
              <div className="alert alert-info">
                <div className="d-flex">
                  <i className="bi bi-info-circle fs-4 me-3" style={{ color: 'var(--accent)' }}></i>
                  <div>
                    <strong>¿Necesitas una respuesta rápida?</strong><br/>
                    Para consultas urgentes, te recomendamos llamarnos o escribirnos por WhatsApp.
                    Responderemos tu correo en un plazo máximo de 24 horas hábiles.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mapa (opcional) */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="h5 mb-3">
                <i className="bi bi-map me-2" style={{ color: 'var(--accent)' }}></i>
                Nuestra ubicación
              </h3>
              <div className="ratio ratio-16x9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.234567890123!2d-70.6485678!3d-33.456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzI0LjQiUyA3MMKwMzgnNTQuOCJX!5e0!3m2!1ses!2scl!4v1610000000000!5m2!1ses!2scl"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación de 1000 Sabores"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}