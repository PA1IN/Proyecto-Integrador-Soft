import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecibirVerificacion, useCambiarPassword } from '../hooks/useForgotPassword';

export const CambiarPassword = () => {
  const [contra,setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmContra, setConfirmPassword] = useState('');

  const {data: verificacion} = useRecibirVerificacion();
  const cambiarContra = useCambiarPassword();


  const cambiar = (e: SyntheticEvent) => {
    e.preventDefault();
    
    if (contra !== confirmContra) {
      setErrorMsg('Las contraseñas no coinciden');
      return;
    }
    
    setErrorMsg('');
    
    cambiarContra.mutate({correo: verificacion.correo, password: contra});
    setPassword('');
    setConfirmPassword(''); 
  };



  return (
    <div className = "container">
      <div className = "logos">
          <img src= "images/Escudo-UCN-Full-Color.png" alt="Escudo-UCN-Full-Color" className = "escudo-ucn"/>
          <img src = "images/eic-w-m-modified.png" alt="eic-w-m" className = "logo-eic"/>
      </div>
      { verificacion === null && (
        <p><h1>Revisa tu correo y confirma que eres tú</h1>
        <h2>Luego de confirmar, recarga la página</h2></p>
        )}
      { verificacion.verificado === true && (
        <p>
            <form onSubmit={cambiar}>
                <input type = "password" placeholder="Nueva contraseña" value={contra} onChange={(e)=> setPassword(e.target.value)} required />
                <input type = "password" placeholder="Repita nueva contraseña" value={confirmContra} onChange={(e)=> setConfirmPassword(e.target.value)} required />
                <button type="submit">Agregar</button>
            </form>
        </p>
        )}      

    </div>
  )
}

export default CambiarPassword