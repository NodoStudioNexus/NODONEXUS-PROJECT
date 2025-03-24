import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { login } from '../../infraestructure/redux/authSlice';
import { PrivateRoutes } from '../../../../config/routes';
import { RootState } from '../../../../app/store';
import { loginSchema } from '../../domain/schemas/LoginFormShema';


// Estilos 
import './loginForm.scss';

const LoginForm = () => {
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

  const initialValues = {
    email: '',
    password: '',
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (values: typeof initialValues) => {
    dispatch(login(values) as any);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='formContainer' >
          {error && <p className='errorServer' >{error}</p>}
          <fieldset>
            <label htmlFor="email"></label>
            <Field type="email" name="email" placeholder="Correo electrónico" disabled={loading} />
            <ErrorMessage name="email" component="p" className="errorForm" />
          </fieldset>

          <fieldset>
            <label htmlFor="password"></label>
            <Field type="password" name="password" placeholder="Contraseña" disabled={loading} />
            <ErrorMessage name="password" component="p" className="errorForm" />
          </fieldset>

          <button type="submit" disabled={loading || isSubmitting}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>

        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
