import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../hooks/useForgotPassword';

export const ForgotPassword = () => {
  const [correo, setCorreo] = useState('');
  const [error, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [exito,setExitoMsg] = useState('');

  const recuperarPassword = useForgotPassword(
    () => {
        setErrorMsg('correo enviado con exito, revisa la bandeja xd');
    },
    (error) => 
    {
        setErrorMsg(error)
    }
  )

  const enviar = (e: SyntheticEvent) => 
  {
    e.preventDefault();
    setErrorMsg('');
    setExitoMsg('');
    recuperarPassword.mutate({correo});
      
  };

  return (
    <div>
        <h1>Recuperar contraseña</h1>
        <form onSubmit={enviar}>
            <label>Correo: </label>
                <input type="email" name="email" id = "email" required value = {correo}
                onChange = {e => setCorreo(e.target.value)}
                    placeholder = "Ingrese su correo porfavor.."
                />
                <button type = 'submit' disabled={recuperarPassword.isPending}>{recuperarPassword.isPending ? 'enviando..':'enviar'}</button>
        </form>
        {exito && <p>{exito}</p>}
        {error && <p>{error}</p>}

        <p>
            <button onClick={()=> navigate('/login')}>Volver al login</button>
        </p>
    </div>
  )
}

export default ForgotPassword