import React from 'react';
import "./CuadradoColor.css";

function CuadradoColor() 
{
    //logica js
    return(
            
        <div className = "container">
            <div className = "logos">
                <img src= "images/Escudo-UCN-Full-Color.png" alt="Escudo-UCN-Full-Color" className = "escudo-ucn"/>
                <img src = "images/eic-w-m-modified.png" alt="eic-w-m" className = "logo-eic"/>
            </div>
            <h1>Calendario UCN </h1>
            <h2>Bienvenid@!</h2>
            <form>
                <div className = "form-group">
                    <label for = "email">Correo Electronico: </label>
                    <input type = "email" id = "email" placeholder = 'Ingrese su Correo...' required></input>
                </div>
                <div className = "form-group">
                    <label for = "password">Contraseña: </label>
                    <input type = "password" id = "password" placeholder = 'Ingrese su Contraseña...' required></input>
                </div>
                <button type = "submit" className = "login-button">INICIAR SESION</button>
                <p className = "form-regis">¿Aun no tienes una cuenta? <a href="https://i.kym-cdn.com/entries/icons/facebook/000/053/192/tralalero_tral.jpg">Regístrate</a></p>
                <p className = "form-pass">¿Olvidaste tu contraseña? <a href="https://i.ytimg.com/vi/KDjgXIviEgw/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHcBYAC0AWKAgwIABABGE8gXShlMA8=&rs=AOn4CLCVAkKVoFIonzBnJVUbwQXsL5LQUw">Recuperarla</a></p>
            
            </form>
        </div>

    );
}


export default CuadradoColor;