import LoginForm from '../components/LoginForm';

import './loginPage.scss';

const LoginPage = () => {
  return (
    <>
      <section className='loginContainer'>
        <header className='loginContainer-header'>
          <h3>NODO NEXUS</h3>
          <h2>Bienvenidos</h2>
        </header>
        <div className='loginContainer-loginForm'>
          <LoginForm />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
