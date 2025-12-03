import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de carga de posts
        // HOLIWIS
        const mockPosts = [
            {
                id: 1,
                titulo: '5 recetas fáciles para hacer en casa',
                extracto: 'Descubre nuestras recetas favoritas que puedes preparar en tu cocina con ingredientes simples y obtener resultados deliciosos.',
                contenido: 'En este artículo te enseñamos 5 recetas que puedes preparar fácilmente en casa, desde postres clásicos hasta innovaciones...',
                fecha: '2024-03-10',
                autor: 'Chef Valentina',
                categoria: 'Recetas',
                imagen: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop',
                lectura: '5 min',
                destacado: true
            },
            {
                id: 2,
                titulo: 'Consejos para decorar tus pasteles como un profesional',
                extracto: 'Aprende técnicas de decoración que harán que tus pasteles luzcan increíbles y sorprendan a todos.',
                contenido: 'La decoración de pasteles es un arte que cualquiera puede dominar con práctica y los consejos correctos...',
                fecha: '2024-03-05',
                autor: 'Pastelero Carlos',
                categoria: 'Técnicas',
                imagen: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w-500&auto=format&fit=crop',
                lectura: '7 min',
                destacado: true
            },
            {
                id: 3,
                titulo: 'Las tendencias de repostería para este año',
                extracto: 'Mantente al día con las últimas tendencias en sabores, decoraciones y estilos de pastelería.',
                contenido: 'Cada año surgen nuevas tendencias en el mundo de la repostería. Te contamos cuáles serán las más populares...',
                fecha: '2024-02-28',
                autor: 'María González',
                categoria: 'Tendencias',
                imagen: 'https://images.unsplash.com/photo-1559620192-032c64bc86af?w=500&auto=format&fit=crop',
                lectura: '6 min',
                destacado: false
            },
            {
                id: 4,
                titulo: 'La importancia de los ingredientes orgánicos en la repostería',
                extracto: 'Descubre cómo los ingredientes orgánicos pueden transformar tus postres y hacerlos más saludables.',
                contenido: 'Los ingredientes orgánicos no solo son mejores para la salud, sino que también aportan sabores más auténticos...',
                fecha: '2024-02-20',
                autor: 'Nutricionista Ana',
                categoria: 'Salud',
                imagen: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=500&auto=format&fit=crop',
                lectura: '8 min',
                destacado: false
            },
            {
                id: 5,
                titulo: 'Postres sin azúcar: Una opción saludable y deliciosa',
                extracto: 'Aprende a preparar postres deliciosos sin utilizar azúcar refinada, perfectos para todos.',
                contenido: 'Los postres sin azúcar no tienen por qué ser aburridos. Te mostramos cómo endulzar naturalmente...',
                fecha: '2024-02-15',
                autor: 'Chef Saludable',
                categoria: 'Salud',
                imagen: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=500&auto=format&fit=crop',
                lectura: '6 min',
                destacado: true
            },
            {
                id: 6,
                titulo: 'Historia de la pastelería: Un viaje a través del tiempo',
                extracto: 'Conoce cómo ha evolucionado la pastelería desde sus inicios hasta la actualidad.',
                contenido: 'La pastelería tiene una rica historia que se remonta a civilizaciones antiguas. Descubre su evolución...',
                fecha: '2024-02-10',
                autor: 'Historiador Gastronómico',
                categoria: 'Historia',
                imagen: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=500&auto=format&fit=crop',
                lectura: '10 min',
                destacado: false
            }
        ];

        // Simular carga de datos
        setTimeout(() => {
            setPosts(mockPosts);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    const postsDestacados = posts.filter(post => post.destacado);
    const otrosPosts = posts.filter(post => !post.destacado);

    return (
        <div className="container py-4">
            {/* Hero Section del Blog */}
            <div className="text-center mb-5">
                <h1 className="display-5 fw-bold mb-3" style={{ fontFamily: 'Pacifico, cursive', color: 'var(--choco)' }}>
                    🍰 Blog de Pastelería
                </h1>
                <p className="lead text-muted mb-4">
                    Descubre recetas, consejos y tendencias del mundo de la repostería artesanal
                </p>
                <div className="d-flex justify-content-center gap-2">
                    <span className="badge bg-accent">Recetas</span>
                    <span className="badge bg-secondary">Técnicas</span>
                    <span className="badge bg-success">Salud</span>
                    <span className="badge bg-info">Tendencias</span>
                </div>
            </div>

            {/* Posts Destacados */}
            {postsDestacados.length > 0 && (
                <section className="mb-5">
                    <h2 className="h3 mb-4" style={{ color: 'var(--text)' }}>
                        <i className="bi bi-star-fill me-2" style={{ color: 'var(--accent)' }}></i>
                        Artículos Destacados
                    </h2>
                    <div className="row g-4">
                        {postsDestacados.map(post => (
                            <div key={post.id} className="col-md-6">
                                <div className="card border-0 shadow-sm h-100 post-card">
                                    <div className="row g-0 h-100">
                                        <div className="col-md-5">
                                            <div className="post-image h-100" style={{
                                                backgroundImage: `url(${post.imagen})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                minHeight: '200px'
                                            }}>
                                                <div className="position-absolute top-0 start-0 m-3">
                                                    <span className="badge bg-accent">{post.categoria}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="card-body d-flex flex-column h-100">
                                                <div className="mb-2">
                                                    <small className="text-muted">
                                                        <i className="bi bi-calendar me-1"></i>
                                                        {new Date(post.fecha).toLocaleDateString('es-CL')}
                                                    </small>
                                                    <span className="mx-2">•</span>
                                                    <small className="text-muted">
                                                        <i className="bi bi-clock me-1"></i>
                                                        {post.lectura} de lectura
                                                    </small>
                                                </div>
                                                <h5 className="card-title mb-2">{post.titulo}</h5>
                                                <p className="card-text flex-grow-1 text-muted">
                                                    {post.extracto}
                                                </p>
                                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                                    <small className="text-muted">
                                                        <i className="bi bi-person me-1"></i>
                                                        {post.autor}
                                                    </small>
                                                    <Link 
                                                        to={`/blog/${post.id}`} 
                                                        className="btn btn-sm btn-accent"
                                                    >
                                                        Leer más
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Todos los Posts */}
            <section className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h3 mb-0" style={{ color: 'var(--text)' }}>
                        <i className="bi bi-newspaper me-2" style={{ color: 'var(--accent)' }}></i>
                        Últimos Artículos
                    </h2>
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            Filtrar por categoría
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Todos</a></li>
                            <li><a className="dropdown-item" href="#">Recetas</a></li>
                            <li><a className="dropdown-item" href="#">Técnicas</a></li>
                            <li><a className="dropdown-item" href="#">Salud</a></li>
                            <li><a className="dropdown-item" href="#">Tendencias</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row g-4">
                    {otrosPosts.map(post => (
                        <div key={post.id} className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="post-image" style={{
                                    backgroundImage: `url(${post.imagen})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px',
                                    position: 'relative'
                                }}>
                                    <div className="position-absolute top-0 start-0 m-3">
                                        <span className="badge bg-accent">{post.categoria}</span>
                                    </div>
                                    <div className="position-absolute bottom-0 start-0 m-3">
                                        <small className="text-white">
                                            <i className="bi bi-clock me-1"></i>
                                            {post.lectura}
                                        </small>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-2">
                                        <small className="text-muted">
                                            {new Date(post.fecha).toLocaleDateString('es-CL')}
                                        </small>
                                    </div>
                                    <h5 className="card-title mb-2">{post.titulo}</h5>
                                    <p className="card-text text-muted small">
                                        {post.extracto}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <small className="text-muted">
                                            <i className="bi bi-person me-1"></i>
                                            {post.autor}
                                        </small>
                                        <Link 
                                            to={`/blog/${post.id}`} 
                                            className="btn btn-sm btn-outline-accent"
                                        >
                                            <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Section */}
            <div className="card border-0 shadow-sm bg-light p-4">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h5 className="mb-2">¡No te pierdas ningún artículo!</h5>
                        <p className="mb-0 text-muted">
                            Suscríbete a nuestro newsletter y recibe las últimas recetas y consejos directamente en tu email.
                        </p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <div className="input-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="tu@email.com" 
                                style={{ borderColor: 'var(--accent)' }}
                            />
                            <button className="btn btn-accent">
                                <i className="bi bi-envelope me-2"></i>
                                Suscribirme
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

