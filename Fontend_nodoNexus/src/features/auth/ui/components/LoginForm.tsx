import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../infraestructure/redux/authSlice';
import { PrivateRoutes } from '../../../../config/routes';
import { RootState } from '../../../../app/store';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.role && !loading && !error) {
      console.log("Redirigiendo usuario:", user);

      const roleRoutes: Record<string, string> = {
        CLIENT: `/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.CLIENTDASHBOARD}`,
        ADMIN: `/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.ADMINDASHBOARD}`,
        ANALYST: `/${PrivateRoutes.DASHBOARD}/${PrivateRoutes.ANALISTDASHBOARD}`,
      };

      const targetRoute = roleRoutes[user.role] || `/${PrivateRoutes.DASHBOARD}`;

      navigate(targetRoute);
    }
  }, [user, loading, error, navigate]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }) as any);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo"
        disabled={loading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Iniciar sesión'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default LoginForm;
