import React from 'react'
import "./Login.scss"

const Login: React.FC = () => {
  return (
    <div className="login"> 
        <div className="loginContainer">
            <div className="loginTitle">
                <h3> Sign in 
                    &#9978;

                </h3>
            </div>
            <form className="loginForm">
                <input spellCheck="false" className="loginInput" placeholder="Nickname" type="text" />
                <input spellCheck="false" className="loginInput" placeholder="Password" type="password" />
            </form>
            <button className="loginButton">
                Login
            </button>
        </div>
    </div>
  )
}

export default Login