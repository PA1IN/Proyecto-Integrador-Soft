import React,{SyntheticEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '../hooks/useLogin';
import '../styles/login.css'

export const Login = () => {
  const [rut,setRut] = useState('');
  const [password,setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const {setToken} = useAuth();
  const navigate = useNavigate();

  const login = useLogin((token) => {
    setToken(token);
    navigate('/Home');
  },
  (error)=>{
    setErrorMsg(error);
  }

);

  const submit = (e: SyntheticEvent) => 
  {
    e.preventDefault();
    setErrorMsg('');
    login.mutate({rut,password});
      
  };


  return (
    <div className = "container">
      <div className = "logos">
          <img src= "images/Escudo-UCN-Full-Color.png" alt="Escudo-UCN-Full-Color" className = "escudo-ucn"/>
          <img src = "images/eic-w-m-modified.png" alt="eic-w-m" className = "logo-eic"/>
      </div>
      <h1>Calendario UCN </h1>
      <h2>Bienvenid@!</h2>
      <form onSubmit={submit}>
          <div className = "form-group">
              <label htmlFor = "rut">Rut: </label>
              <input type = "text" id = "rut" placeholder = 'Ingrese su RUT...' required value={rut} onChange={e => setRut(e.target.value)}/>
          </div>
          <div className = "form-group">
              <label htmlFor = "password">Contraseña: </label>
              <input type = "password" id = "password" placeholder = 'Ingrese su Contraseña...' required value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type = "submit" className = "login-button" value="Submit" disabled={login.isPending}>
          {login.isPending? 'iniciando sesion...': 'Iniciar Sesion'}
          </button>
          
      
      </form>
      {login.isError && <p>usuario o contraseña incorrectas </p>}
      {errorMsg && <p>{errorMsg}</p>}
      <p className = "form-regis">¿Aun no tienes una cuenta? <a href="/Register">Regístrate aquí</a></p>
      <p className = "form-pass">¿Olvidaste tu contraseña? <a href="/ForgotPassword">Recuperarla aqui</a></p>
  </div>
  );
}



//export default Login;

/*<h1>Login</h1>
        <form onSubmit={submit}>
            <label>Rut: </label>
            <input type="text" name="rut" required value = {rut}
              onChange = {e => setRut(e.target.value)}
                   placeholder = "Ingrese porfavor su RUT.."
            />
            <label>Contraseña: </label>
            <input type="password" name="password" required value = {password}
              onChange = {e => setPassword(e.target.value)}
                   placeholder = "Ingrese porfavor su contraseña"
            />
            <button type="submit" value="Submit" disabled={login.isPending}>
              {login.isPending? 'iniciando sesion...🗣️🗣️': 'Login'}
            </button>
        </form>
        {login.isError && <p>usuario o contraseña incorrectas </p>}
        {errorMsg && <p>{errorMsg}</p>}
        <p>Si no tienes cuenta, registrate <a href="/Register">aquí</a></p>
        <p>¿Olvidaste tu contraseña? <a href="/ForgotPassword">Recupera tu contraseña</a></p>*/