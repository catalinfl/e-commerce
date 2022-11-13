import React from 'react'
import "./register.scss"


const Register: React.FC = () => {
    return (
      <div className="register"> 
          <div className="registerContainer">
              <div className="registerTitle">
                  <h3> Register now
                      &#9996;
  
                  </h3>
              </div>
              <form className="registerForm">
                  <input spellCheck="false" className="registerInput" placeholder="Nickname" type="text" id="name" />
                  <input spellCheck="false" className="registerInput" placeholder="E-mail" type="email" id="email" />
                  <input spellCheck="false" className="registerInput" placeholder="Password" type="password" id="password" />
              </form>
              <button className="registerButton">
                  Register
              </button>
          </div>
      </div>
    )
    
}

export default Register