import axios from 'axios'
import React, { ReactElement, ReactHTML, useState } from 'react'
import "./register.scss"


type RegisterType = {
    username: string,
    email: string,
    password: string
}

const Register: React.FC = (): ReactElement => {
    
    const initialObject: RegisterType = {
        username: "",
        email: "",
        password: ""    
    }
    
    const [register, setRegister] = useState<RegisterType>(initialObject)
    
    console.log(register)

    
    const registerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("http://localhost:3001/auth/register")
    }

    const settingForm = (e: React.ChangeEvent<HTMLInputElement>, FormType: keyof RegisterType) => {
        setRegister({ ...register, [FormType]: e.target.value})
    }

    return (
      <div className="register"> 
          <div className="registerContainer">
              <div className="registerTitle">
                  <h3> Register now
                      &#9996;

                  </h3>
              </div>
              <form className="registerForm" onSubmit={(e: React.FormEvent<HTMLFormElement>) => registerSubmit(e)}>
                  <input spellCheck="false" className="registerInput" placeholder="Nickname" type="text" id="name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => settingForm(e, "username") } />
                  <input spellCheck="false" className="registerInput" placeholder="E-mail" type="email" id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => settingForm(e, "email") } />
                  <input spellCheck="false" className="registerInput" placeholder="Password" type="password" id="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => settingForm(e, "password") } />
                <button className="registerButton">
                    Register
                </button>
              </form>
          </div>
      </div>
    )
    
}

export default Register