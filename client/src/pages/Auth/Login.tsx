import axios from 'axios'
import React, { ReactHTML, useState } from 'react'
import "./Login.scss"

type LoginType = {
    username: string,
    password: string
}

const Login: React.FC = () => {

    const [login, setLogin] = useState<LoginType>({
        username: "",
        password: ""
    })

    const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post("http://localhost:3001/auth/login")
    }


    const settingForm = (e: React.ChangeEvent<HTMLInputElement>, FormData: keyof LoginType) => {
        setLogin({ ...login, [FormData]: e.target.value})
    }


  return (
    <div className="login"> 
        <div className="loginContainer">
            <div className="loginTitle">
                <h3> Sign in 
                    &#9978;

                </h3>
            </div>
            <form className="loginForm" onSubmit={(e: React.FormEvent<HTMLFormElement>) => loginSubmit(e)}>
                <input spellCheck="false" className="loginInput" placeholder="Nickname" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => settingForm(e, 'username')}/>
                <input spellCheck="false" className="loginInput" placeholder="Password" type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => settingForm(e, 'password')} />
                <button className="loginButton">
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login