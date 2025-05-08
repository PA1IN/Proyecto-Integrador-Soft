import React,{SyntheticEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import '../styles/login.css'

export const Register = () => { //Hooks
  const [rut, setRut] = useState('');
  const [name, setName] = useState('');
  const [correo,setCorreo] = useState('');
  const [password,setPassword] = useState('');
  const [errorMsg,setErrorMsg] = useState('');
  const navigate = useNavigate();

  const register = useRegister(() => {
    navigate('/Login');
    },
    (error) => {
      setErrorMsg(error);
    }
  );

  const enviar = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorMsg('');
    register.mutate({rut,name,correo,password});
  };

  return (
    <div className = "container">
      <div className = "logos">
          <img src= "images/Escudo-UCN-Full-Color.png" alt="Escudo-UCN-Full-Color" className = "escudo-ucn"/>
          <img src = "images/eic-w-m-modified.png" alt="eic-w-m" className = "logo-eic"/>
      </div>
      <h1>Registro </h1>
      <h2>Bienvenid@!</h2>
      <form onSubmit={enviar}>
          <div className = "form-group">
              <label htmlFor = "rut">Ingrese su Rut: </label>
              <input type = "text" id = "rut" placeholder = 'Ingrese su RUT...' required value={rut} onChange={e => setRut(e.target.value)}/>
          </div>

          <div className = "form-group">
              <label htmlFor = "name">Ingrese su Nombre: </label>
              <input type = "username" id = "name" placeholder = 'Ingrese su nombre...' required value={name} onChange={e => setName(e.target.value)}/>
          </div>

          <div className = "form-group">
              <label htmlFor = "name">Ingrese su Correo: </label>
              <input type = "email" id = "email" placeholder = 'Ingrese su Correo electronico...' required value={correo} onChange={e => setCorreo(e.target.value)}/>
          </div>

          <div className = "form-group">
              <label htmlFor = "password">Contraseña: </label>
              <input type = "password" id = "password" placeholder = 'Ingrese su Contraseña...' required value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type = "submit" className = "login-button" value="Submit" disabled={register.isPending}>
          {register.isPending? 'Registrando...': 'Registrarse'}
          </button>
          
      
      </form>
      {errorMsg && <p>{errorMsg}</p>}
      
  </div>
    
  );
}







/*<div>
        <h1>Registro</h1>
        <form onSubmit={enviar}>
            <label>Ingrese su RUT: </label>
            <input type = "text" name = "rut" placeholder = 'Ingrese su RUT...' required value={rut}
              onChange={e => setRut(e.target.value)}
            />

            <label>Ingrese su nombre: </label>
            <input type = "username" name = "username" placeholder = 'Ingrese su nombre de usuario...' required value={name}
              onChange={e => setName(e.target.value)}
            />

            <label>Correo Electronico: </label>
            <input type = "email" name = "email" placeholder = 'Ingrese un correo electronico porfavor...' required value={correo}
              onChange={e => setCorreo(e.target.value)}

            />
            <label>Contraseña: </label>
            <input type = "password" name = "password" placeholder = 'Ingrese una contraseña...' required value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" disabled = {register.isPending}>
              {register.isPending? 'Registrando...🗿' : 'Registrarse'}
            </button>
        </form>
        {errorMsg && <p>{errorMsg}</p>}
    </div>*/