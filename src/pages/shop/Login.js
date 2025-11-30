import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-accent" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Iniciando sesión...' : 'Ingresar'}
                  </button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
                </div>

                {/* Información para testing */}
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="mb-2">Credenciales de prueba:</h6>
                  <p className="mb-1 small">
                    <strong>Admin:</strong> admin@admin.com / admin123
                  </p>
                  <p className="mb-0 small">
                    <strong>Usuario:</strong> usuario@ejemplo.com / user123
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}