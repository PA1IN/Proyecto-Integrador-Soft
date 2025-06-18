import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecibirVerificacion, useCambiarPassword } from '../hooks/useForgotPassword';

export const CambiarPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [email, setEmail] = useState<string | null>(null); 
  const navigate = useNavigate();

  const { mutate: verifyToken, isPending: isVerifying, error: verifyError, data: verifyData } = useRecibirVerificacion();
  const { mutate: cambiarContra, isPending: isChanging } = useCambiarPassword();

  

  const handleTokenSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setErrorMsg('');
        
        if (!token) {
            setErrorMsg('Por favor ingresa el código de verificación');
            return;
        }
        
        verifyToken(token, {
            onSuccess: (data) => {
                setEmail(data.email);
                setSuccessMsg('Código verificado correctamente');
            },
            onError: (error: any) => {
                setErrorMsg(error.response?.data?.message || 'Código de verificación incorrecto');
            }
        });
    };


  const handlePasswordSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        
        if (!email) {
            setErrorMsg('No se encontró el correo asociado');
            return;
        }
        
        if (password !== confirmPassword) {
            setErrorMsg('Ambas contraseñas deben ser iguales');
            return;
        }
        
        if (password.length < 6) {
            setErrorMsg('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        setErrorMsg('');
        
        cambiarContra({ email, newPassword: password }, {
            onSuccess: () => {
                setSuccessMsg('Contraseña cambiada exitosamente!. Cierra esta pestaña');
            },
            onError: (error: any) => {
                setErrorMsg(error.response?.data?.message || 'Error al cambiar la contraseña');
            }
        });
    };


  return (
    <div className = "container">
      <div className = "logos">
          <img src= "images/Escudo-UCN-Full-Color.png" alt="Escudo-UCN-Full-Color" className = "escudo-ucn"/>
          <img src = "images/eic-w-m-modified.png" alt="eic-w-m" className = "logo-eic"/>
      </div>
            {!email && (
                <div className="token-form">
                    <h1>Ingresa tu código de verificación</h1>
                    <form onSubmit={handleTokenSubmit}>
                        <input
                            type="text"
                            placeholder="Código de verificación"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={isVerifying}>
                            {isVerifying ? 'Verificando...' : 'Verificar'}
                        </button>
                    </form>
                </div>
            )}
            {email && (
                <div className="password-form">
                    <h1>Cambiar contraseña para {email}</h1>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                        <input
                            type="password"
                            placeholder="Repita nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                        <button type="submit" disabled={isChanging}>
                            {isChanging ? 'Cambiando...' : 'Cambiar contraseña'}
                        </button>
                    </form>
                </div>
            )}
            {errorMsg && (
                <div className="error-message">
                    {errorMsg}
                </div>
            )}
            {successMsg && (
                <div className="success-message">
                    {successMsg}
                </div>
            )}      

    </div>
  )
}

export default CambiarPassword